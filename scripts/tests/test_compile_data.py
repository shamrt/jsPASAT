# -*- coding: utf-8 -*-
import os

import pytest

from scripts import compile_data


TESTS_DIR = os.path.abspath(os.path.join(__file__, '..'))
MOCK_DATA_DIR = os.path.join(TESTS_DIR, 'mock_data')

def test_get_data_file_paths():
    mock_practice_csvs = compile_data.get_data_file_paths(
        MOCK_DATA_DIR, 'practice')
    assert len(mock_practice_csvs) == 7
    csv_1_path = os.path.join(TESTS_DIR, 'mock_data', 'practice', '1.csv')
    assert csv_1_path in mock_practice_csvs
