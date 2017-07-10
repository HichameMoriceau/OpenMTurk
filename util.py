import copy
import os
import json

def load_json_config(config_file_path):
	try:
		with open(config_file_path, 'r') as f:
			json_config = json.load(f)
	except Exception as e:
		print('ERROR whilst parsing JSON config file. Is your JSON syntax correct? {}'.format(e))

	env_vars = copy.deepcopy(json_config['env_vars'])
	del json_config['env_vars']

	return json_config, env_vars
