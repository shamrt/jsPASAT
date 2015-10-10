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


def test_complete_compile_experiment_data():
    experiment_path_1 = os.path.join(MOCK_DATA_DIR, 'experiment', '1.csv')
    df = compile_data.get_csv_as_dataframe(experiment_path_1)
    compiled = compile_data.compile_experiment_data(df)
    assert compiled['condition'] == 5
    assert compiled['block_order'] == 'medium,medium,hard,medium,easy,medium,medium,medium,medium'
    assert compiled['num_blocks'] == 9
