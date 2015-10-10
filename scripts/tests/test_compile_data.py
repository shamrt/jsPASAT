# -*- coding: utf-8 -*-
import os

import pytest

from scripts import compile_data


TESTS_DIR = os.path.abspath(os.path.join(__file__, '..'))
MOCK_DATA_DIR = os.path.join(TESTS_DIR, 'mock_data')
CSV_1_PRACTICE_PATH = os.path.join(MOCK_DATA_DIR, 'practice', '1.csv')
CSV_7_PRACTICE_PATH = os.path.join(MOCK_DATA_DIR, 'practice', '7.csv')


def test_get_data_file_paths_returns_list_of_paths():
    mock_practice_csvs = compile_data.get_csv_paths(MOCK_DATA_DIR, 'practice')
    assert len(mock_practice_csvs) == 7
    assert CSV_1_PRACTICE_PATH in mock_practice_csvs


def test_compile_practice_data_returns_passing():
    df = compile_data.get_csv_as_dataframe(CSV_1_PRACTICE_PATH)
    compiled = compile_data.compile_practice_data(df)
    assert compiled['id'] == 1
    assert compiled['passed_practice'] == True


def test_compile_practice_data_returns_failing():
    df = compile_data.get_csv_as_dataframe(CSV_7_PRACTICE_PATH)
    compiled = compile_data.compile_practice_data(df)
    assert compiled['id'] == 7
    assert compiled['passed_practice'] == False
