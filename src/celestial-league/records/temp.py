# split log file into individual records and save them to a new file by date

import os
import re
import sys
import datetime

import re

# Input and output file paths
input_file = 'output-2024-11-28 copy.log'
output_file = 'filtered_file.log'

# Date prefix to filter
filter_date = '2024-11-27T'
filter_name = '"name": "제발떠라제발"'

# Open the input file and process line by line
with open(input_file, 'r', encoding='utf-8') as infile, open(output_file, 'w', encoding='utf-8') as outfile:
    write_next_line = False
    for line in infile:
        # Check if the line starts with the desired date prefix
        if line.startswith(filter_date):
            write_next_line = True
        # Check if the line contains the desired name
        elif filter_name in line:
            write_next_line = True
        else:
            write_next_line = False

        # Write the matching line to the output file
        if write_next_line:
            outfile.write(line)
