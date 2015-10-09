#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""A script that parses raw data output by jsPASAT (jsPsych), compiles each
participant's data and creates/updates a file in jsPASAT's ``data``
directory.
"""
import os
import glob

import pandas as pd


PROJECT_DIR = os.path.abspath(__file__ + '/../../')
DATA_DIR = os.path.join(PROJECT_DIR, 'data')


def get_data_file_paths(basedir, type_):
    pass


def main():
    practice_glob_path = os.path.join(DATA_DIR, 'practice', '*.csv')
    practice_csv_paths = glob.glob(practice_path)
    print practice_csv_paths


if __name__ == '__main__':
    main()
