from pymongo import MongoClient
import pymongo
import inspect
import os
import util as UTIL

env_vars = UTIL.load_json_config(os.environ['OPENMTURK_CONFIG'])[1]

client = MongoClient()
db = client[env_vars['OPENMTURK_TABLE_NAME']]


def select_all(query_dict={}):
	return list(db.labels_db.find(query_dict))


def insert_label(data):
	
	db.labels_db.update_one(
		{'img_path': data['img_path']}, 
		{'$set': data}, 
		upsert=True
	)


def delete_label(data):

	result = db.labels_db.update_one(
		{'img_path': data['img_path']}, 
		{'$set':{'is_labelled': False, 
				 'bbs': [],
				 'category': '',
				 'orientation': ''}}
	)


def select_label(img_path):
	label = []
	log_prefix = 'Client request - {}'.format(inspect.stack()[0][3])

	try:
		label = db.labels_db.find({'img_path': img_path})[0]
		
		del label['_id'] # not json-friendly object

		print('{} - labels for image {}: existing labels found'.format(
			log_prefix, 
			img_path))

	except Exception as e:
		print('{} - labels for image {}: None found.'.format(
			log_prefix, 
			img_path))

	return label

def count_labels():
	return int(db.labels_db.count({'is_labelled': True}))