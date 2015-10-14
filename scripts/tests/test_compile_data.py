# -*- coding: utf-8 -*-
import os

import pytest

from scripts import compile_data


TESTS_DIR = os.path.abspath(os.path.join(__file__, '..'))
MOCK_DATA_DIR = os.path.join(TESTS_DIR, 'mock_data')
PRACTICE_PATH_1 = os.path.join(MOCK_DATA_DIR, 'practice', '1.csv')


def test_get_data_file_paths_returns_list_of_paths():
    mock_practice_csvs = compile_data.get_csv_paths(MOCK_DATA_DIR, 'practice')
    assert len(mock_practice_csvs) == 7
    assert PRACTICE_PATH_1 in mock_practice_csvs


def test_passing_compile_practice_data():
    df = compile_data.get_csv_as_dataframe(PRACTICE_PATH_1)
    data = compile_data.compile_practice_data(df)
    assert data['id'] == 1
    assert data['passed_practice'] == True


def test_failing_compile_practice_data():
    practice_path_7 = os.path.join(MOCK_DATA_DIR, 'practice', '7.csv')
    df = compile_data.get_csv_as_dataframe(practice_path_7)
    data = compile_data.compile_practice_data(df)
    assert data['id'] == 7
    assert data['passed_practice'] == False


def test_get_response_from_json():
    mock_json_string = '{"Q0":"3"}'
    response = compile_data.get_response_from_json(mock_json_string)
    assert response == "3"


def get_csv_as_df(stage, id):
    experiment_path = os.path.join(
        MOCK_DATA_DIR, stage, '{}.csv'.format(id))
    df = compile_data.get_csv_as_dataframe(experiment_path)
    return df


def test_summarize_pasat_chunk():
    df = get_csv_as_df('experiment', 1)

    # first block
    pasat_block = df.loc[df['internal_chunk_id'] == '0-0.3-0']
    block_summary = compile_data.summarize_pasat_chunk(pasat_block)
    assert block_summary['accuracy'] == 0.5714286
    assert block_summary['effort_rating'] == 5
    assert block_summary['discomfort_rating'] == 5
    assert block_summary['block_type'] == 'medium'

    # last block
    pasat_block = df.loc[df['internal_chunk_id'] == '0-0.11-0']
    block_summary = compile_data.summarize_pasat_chunk(pasat_block)
    assert block_summary['accuracy'] == 0.3571429
    assert block_summary['effort_rating'] == 7
    assert block_summary['discomfort_rating'] == 7
    assert block_summary['block_type'] == 'medium'


def test_complete_compile_experiment_data():
    df = get_csv_as_df('experiment', 1)
    data = compile_data.compile_experiment_data(df)
    assert data['condition'] == 5

    assert data['block_order'] == 'medium,medium,hard,medium,easy,medium,medium,medium,medium'
    assert data['num_blocks'] == 9

    assert data['anticipated_enjoyment'] == 3
    assert data['anticipated_performance'] == 4
    assert data['anticipated_effort'] == 4
    assert data['anticipated_discomfort'] == 4
    assert data['anticipated_fatigue'] == 4

    assert data['medium_accuracy'] == 0.4183674
    assert data['medium_effort'] == 4.2857143
    assert data['medium_discomfort'] == 4.2857143

    assert data['hard_accuracy'] == 0.3571429
    assert data['hard_effort'] == 4
    assert data['hard_discomfort'] == 4
    assert data['easy_accuracy'] == 0.5714286
    assert data['easy_effort'] == 4
    assert data['easy_discomfort'] == 4

    assert data['start_discomfort'] == 5
    assert data['peak_discomfort'] == 7
    assert data['end_discomfort'] == 7
    assert data['avg_discomfort'] == 4.2222222

    assert data['start_effort'] == 5
    assert data['peak_effort'] == 7
    assert data['end_effort'] == 7
    assert data['avg_effort'] == 4.2222222

    assert data['avg_accuracy'] == 0.4285714
    assert data['max_accuracy'] == 0.5714286
    assert data['min_accuracy'] == 0.2857143
    assert data['start_accuracy'] == 0.5714286
    assert data['end_accuracy'] == 0.3571429

    assert data['auc_accuracy'] == 3.3928572
    assert data['auc_effort'] == 32.0
    assert data['auc_discomfort'] == 32.0


def test_complete_demographics_data():
    df = get_csv_as_df('follow_up', 1)
    data = compile_data.compile_demographic_data(df)
    expected_answers = [
        ('age', '20'),
        ('dob', '01/1995'),
        ('sex', 'Male'),
        ('edu_year', 'Graduated'),
        ('edu_plan', 'PhD'),
        ('first_lang', 'Yes'),
        ('years_eng', 'All my life'),
        ('mother_edu', 'Professional degree (e.g., law)'),
        ('mother_job', 'lawyer'),
        ('father_edu', 'MA/MSc degree'),
        ('father_job', 'computer scientist'),
        ('high_school_avg', '85'),
        ('uni_avg', '85'),
        ('num_uni_stats', '1'),
        ('num_hs_stats', 'None'),
        ('num_hs_math', '4'),
        ('num_uni_math', 'None'),
        ('math_enjoy', '4'),
        ('adhd_diag', 'Yes'),
        ('uni_major', 'psych'),

        ('elect_survey_1', 'No'),
        ('elect_survey_2', 'No'),
        ('elect_survey_3', 'No'),
        ('elect_survey_4', 'No'),
        ('elect_survey_5', 'No'),
        ('elect_survey_6', 'No'),
        ('elect_survey_7', '0'),

        ('behav_survey_1', 'N/A'),
        ('behav_survey_2', 'N/A'),
        ('behav_survey_3', '3<br>Very often<br>or very much'),
        ('behav_survey_4', '2<br>Often or<br>very much'),
        ('behav_survey_5', '1<br>Sometimes<br>or somewhat'),
        ('behav_survey_6', '0<br>Never or<br>not at all'),
        ('behav_survey_7', 'N/A'),
        ('behav_survey_8', '3<br>Very often<br>or very much'),
        ('behav_survey_9', '2<br>Often or<br>very much'),
        ('behav_survey_10', '1<br>Sometimes<br>or somewhat'),
        ('behav_survey_11', '0<br>Never or<br>not at all'),
        ('behav_survey_12', 'N/A'),
        ('behav_survey_13', '3<br>Very often<br>or very much'),
        ('behav_survey_14', '2<br>Often or<br>very much'),
        ('behav_survey_15', '1<br>Sometimes<br>or somewhat'),
        ('behav_survey_16', '0<br>Never or<br>not at all'),
        ('behav_survey_17', 'N/A'),
        ('behav_survey_18', '3<br>Very often<br>or very much'),
    ]
    for label, answer in expected_answers:
        print label
        print answer
        assert data[label] == answer


def test_complete_retrospective_data():
    df = get_csv_as_df('follow_up', 1)
    data = compile_data.compile_retrospective_data(df)
    expected_answers = [
        ('pwmt_effort', 4),
        ('pwmt_discomfort', 4),
        ('pwmt_enjoyment', 4),
        ('pwmt_performance', 4),
        ('pwmt_fatigue', 4),
        ('pwmt_satisfaction', 4),
        ('pwmt_willingtodowmt', 4),
    ]
    for label, answer in expected_answers:
        print label
        print answer
        assert data[label] == answer
