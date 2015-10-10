#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""A script that parses raw data output by jsPASAT (jsPsych), compiles each
participant's data and creates/updates a file in jsPASAT's ``data``
directory.
"""
import os
import glob

import pandas as pd


PROJECT_DIR = os.path.abspath(os.path.join(__file__, '..', '..'))
DATA_DIR = os.path.join(PROJECT_DIR, 'data')


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


def main():
    raw_data = {
        'paths': {}
    }

    # TODO: "SubjectID.", "OutliersAndMissingdata",

    for exp_stage in ['practice', 'experiment', 'follow_up']:
        raw_data['paths'][exp_stage] = get_csv_paths(DATA_DIR, exp_stage)

    compiled_data = []
    for csv_path in raw_data['paths']['practice']:
        participant = {}

        practice_data_df = get_csv_as_dataframe(csv_path)
        compiled_practice_data = compile_practice_data(practice_data_df)
        participant.update(compiled_practice_data)


    # TODO: "BlockLength", "Anticipated_Enjoyment", "Anticipated_Performance", "Anticipated_Effort", "Anticipated_Fatigue", "Max_Effort", "Min_Effort", "First_Effort", "Last_Effort", "Average_Effort", "AUC_Effort", "Hard_Effort", "Medium_Effort", "Easy_Effort", "Max_Discomfort", "Min_Discomfort", "First_Discomfort", "Last_Discomfort", "Average_Discomfort", "AUC_Discomfort", "Hard_Discomfort", "Medium_Discomfort", "Easy_Discomfort",
    # "Max_Accuracy", "Min_Accuracy", "First_Accuracy", "Last_Accuracy", "Average_Accuracy", "AUC_Accuracy", "Hard_Accuracy", "Medium_Accuracy", "Easy_Accuracy",
    # "PWMT_Effort", "PWMT_Discomfort", "PWMT_Enjoyment", "PWMT_Performance", "PWMT_fatigue", "PWMT_satisfaction", "PWMT_WillingToDoWMT", "PWMT_BeContacted",
    # "Sex", "Age", "edu_year", "edu_plan", "first_lang", "years_eng", "moth_edu", "moth_job", "fath_edu", "fath_job", "uni_major", "ethnicity", "ethnicity_TEXT", "born", "motherborn", "fatherborn",


if __name__ == '__main__':
    main()
