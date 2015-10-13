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
    compiled = compile_data.compile_practice_data(df)
    assert compiled['id'] == 1
    assert compiled['passed_practice'] == True


def test_failing_compile_practice_data():
    practice_path_7 = os.path.join(MOCK_DATA_DIR, 'practice', '7.csv')
    df = compile_data.get_csv_as_dataframe(practice_path_7)
    compiled = compile_data.compile_practice_data(df)
    assert compiled['id'] == 7
    assert compiled['passed_practice'] == False


def test_get_response_from_json():
    mock_json_string = '{"Q0":"3"}'
    response = compile_data.get_response_from_json(mock_json_string)
    assert response == "3"


def get_experiment_data_as_df(id):
    experiment_path = os.path.join(
        MOCK_DATA_DIR, 'experiment', '{}.csv'.format(id))
    df = compile_data.get_csv_as_dataframe(experiment_path)
    return df


def test_summarize_pasat_chunk():
    df = get_experiment_data_as_df(1)

    # first block
    pasat_block = df.loc[df['internal_chunk_id'] == '0-0.3-0']
    block_summary = compile_data.summarize_pasat_chunk(pasat_block)
    assert block_summary['accuracy'] == 0.5714286
    assert block_summary['effort_rating'] == '5'
    assert block_summary['discomfort_rating'] == '5'
    assert block_summary['block_type'] == 'medium'

    # last block
    pasat_block = df.loc[df['internal_chunk_id'] == '0-0.11-0']
    block_summary = compile_data.summarize_pasat_chunk(pasat_block)
    assert block_summary['accuracy'] == 0.3571429
    assert block_summary['effort_rating'] == '7<br>A Lot'
    assert block_summary['discomfort_rating'] == '7<br>A Lot'
    assert block_summary['block_type'] == 'medium'


def test_complete_compile_experiment_data():
    df = get_experiment_data_as_df(1)
    compiled = compile_data.compile_experiment_data(df)
    assert compiled['condition'] == 5

    assert compiled['block_order'] == 'medium,medium,hard,medium,easy,medium,medium,medium,medium'
    assert compiled['num_blocks'] == 9

    assert compiled['anticipated_enjoyment'] == '3'
    assert compiled['anticipated_performance'] == '4<br>Average'
    assert compiled['anticipated_effort'] == '4'
    assert compiled['anticipated_discomfort'] == '4'
    assert compiled['anticipated_fatigue'] == '4'

    assert compiled['average_accuracy'] == 0.4285714
    assert compiled['max_accuracy'] == 0.5714286
    assert compiled['min_accuracy'] == 0.2857143
    assert compiled['first_accuracy'] == 0.5714286
    assert compiled['last_accuracy'] == 0.3571429
