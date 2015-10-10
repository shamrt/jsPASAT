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


def main():
    raw_data = {
        'paths': {}
    }

    for exp_stage in ['practice', 'experiment', 'follow_up']:
        raw_data['paths'][exp_stage] = get_csv_paths(DATA_DIR, exp_stage)
    print raw_data


if __name__ == '__main__':
    main()
