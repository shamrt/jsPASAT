#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""A script that parses raw data output by jsPASAT (jsPsych), compiles each
participant's data and creates/updates a file in jsPASAT's ``data``
directory.
"""
import os
import glob
import json

import pandas as pd


PROJECT_DIR = os.path.abspath(os.path.join(__file__, '..', '..'))
DATA_DIR = os.path.join(PROJECT_DIR, 'data')
ROUND_NDIGITS = 7


def get_csv_paths(basedir, exp_stage):
    """Take base data directory and experiment stage. Return list of file paths.
    """
    glob_path = os.path.join(basedir, exp_stage, '*.csv')
    return glob.glob(glob_path)


def get_csv_as_dataframe(path):
    """Take CSV path. Return pandas dataframe.
    """
    return pd.DataFrame.from_csv(path, index_col='trial_index_global')


def compile_practice_data(df):
    """Take pandas dataframe and compile key variables. Return dict.
    """
    compiled_data = {}

    # participant ID
    participant_id_col = df['participant_id'].values
    compiled_data['id'] = participant_id_col[0]

    # was the second practice block completed successfully?
    print df.columns.values
    passed_practice = ('0-0.5-0' in df['internal_chunk_id'].values)
    compiled_data['passed_practice'] = passed_practice

    return compiled_data


def get_response_from_json(string, question_number=0):
    """Take JSON string representing a survey response and decode.
    Return target question answer string.
    """
    decoder = json.JSONDecoder()
    resp_json = decoder.decode(string)
    target_question = "Q{}".format(question_number)
    return resp_json[target_question]


def summarize_pasat_chunk(df):
    """Take pandas dataframe representing raw PASAT chunk data and summarize.
    Return dict.
    """
    summary = {}

    block_type_col = df['block_type'].dropna().values
    summary['block_type'] = block_type_col[0]

    # summarize performance
    raw_trials = df.loc[df['trial_type'] == 'multi-stim-multi-response']
    trials = list(raw_trials['correct'].values)
    trials.pop(0)  # remove fixation data
    accuracy = float(trials.count(True)) / len(trials)
    summary['accuracy'] = round(accuracy, ROUND_NDIGITS)

    # affective ratings
    ratings_json = df.ix[df.last_valid_index()]['responses']
    summary['effort_rating'] = get_response_from_json(ratings_json)
    summary['discomfort_rating'] = get_response_from_json(ratings_json, 1)

    return summary


def compile_experiment_data(df):
    """Take pandas dataframe and compile key variables. Return dict.
    """
    compiled_data = {}

    # condition
    condition_col = df['condition'].values
    compiled_data['condition'] = condition_col[0]

    # blocks and block order
    block_order_col = df['block_order'].values
    block_order = block_order_col[0]
    blocks = block_order.split(',')
    compiled_data['block_order'] = block_order
    compiled_data['num_blocks'] = len(blocks)

    # anticipated questions
    anticipated_questions_index = [
        ('anticipated_enjoyment', 1),
        ('anticipated_performance', 2),
        ('anticipated_effort', 3),
        ('anticipated_discomfort', 4),
        ('anticipated_fatigue', 5)
    ]
    for label, i in anticipated_questions_index:
        response = get_response_from_json(df.ix[i]['responses'])
        compiled_data[label] = response

    # PASAT accuracy and affective reports
    hard_accuracy = None
    medium_accuracy = None
    easy_accuracy = None
    hard_effort = None
    medium_effort = None
    easy_effort = None
    hard_discomfort = None
    medium_discomfort = None
    easy_discomfort = None

    effort_ratings = []
    discomfort_ratings = []
    pasat_accuracies = []

    for i, block in enumerate(blocks, start=3):
        pasat_block_chunk_id = '0-0.{}-0'.format(i)
        pasat_block = df.loc[df['internal_chunk_id'] == pasat_block_chunk_id]
        block_summary = summarize_pasat_chunk(pasat_block)

        effort_ratings.append(block_summary['effort_rating'])
        discomfort_ratings.append(block_summary['discomfort_rating'])
        pasat_accuracies.append(block_summary['accuracy'])

    average_accuracy = sum(pasat_accuracies) / len(pasat_accuracies)
    compiled_data['average_accuracy'] = round(average_accuracy, ROUND_NDIGITS)
    compiled_data['max_accuracy'] = max(pasat_accuracies)
    compiled_data['min_accuracy'] = min(pasat_accuracies)
    compiled_data['first_accuracy'] = pasat_accuracies[0]
    compiled_data['last_accuracy'] = pasat_accuracies[-1]


    return compiled_data


def main():
    # collect lists of raw data CSVs
    raw_data_csvs = {}
    for exp_stage in ['practice', 'experiment', 'follow_up']:
        raw_data_csvs[exp_stage] = get_csv_paths(DATA_DIR, exp_stage)

    # create list of compiled participant data
    compiled_participants = []
    for practice_csv in raw_data_csvs['practice']:
        participant = {
            'missing_data': False
        }

        # compile practice data
        practice_df = get_csv_as_dataframe(practice_csv)
        compiled_practice_data = compile_practice_data(practice_df)
        participant.update(compiled_practice_data)

        # compile experiment data
        # note: checks to ensure that assumed experiment CSV file exists
        assumed_experiment_csv_path = os.path.join(
            DATA_DIR, 'experiment', '{}.csv'.format(participant['id']))

        if assumed_experiment_csv_path in raw_data_csvs['experiment'] and \
                os.path.exists(assumed_experiment_csv_path):
            experiment_df = get_csv_as_dataframe(assumed_experiment_csv_path)
            compiled_experiment_data = compile_experiment_data(experiment_df)
            participant.update(compiled_experiment_data)
        elif not participant['passed_practice']:
            participant['missing_data'] = True

        # append compiled participant data to master list
        compiled_participants.append(participant)



    # TODO: "Max_Effort", "Min_Effort", "First_Effort", "Last_Effort", "Average_Effort", "AUC_Effort", "Hard_Effort", "Medium_Effort", "Easy_Effort", "Max_Discomfort", "Min_Discomfort", "First_Discomfort", "Last_Discomfort", "Average_Discomfort", "AUC_Discomfort", "Hard_Discomfort", "Medium_Discomfort", "Easy_Discomfort",
    # TODO: "Max_Accuracy", "Min_Accuracy", "First_Accuracy", "Last_Accuracy", "Average_Accuracy", "AUC_Accuracy", "Hard_Accuracy", "Medium_Accuracy", "Easy_Accuracy",
    # TODO: "PWMT_Effort", "PWMT_Discomfort", "PWMT_Enjoyment", "PWMT_Performance", "PWMT_fatigue", "PWMT_satisfaction", "PWMT_WillingToDoWMT", "PWMT_BeContacted",
    # TODO: "Sex", "Age", "edu_year", "edu_plan", "first_lang", "years_eng", "moth_edu", "moth_job", "fath_edu", "fath_job", "uni_major", "ethnicity", "ethnicity_TEXT", "born", "motherborn", "fatherborn",


if __name__ == '__main__':
    main()
