from pymongo import MongoClient
import pymongo


client = MongoClient()
db = client['labels_db'] # use existing database


def insert_label(data):
	db.labels_db.update_one({'img_path': data['img_path']}, {'$set': data}, upsert=True)


# def init_db():
# 	db.labels_db.create_index([('img_path', pymongo.ASCENDING)], unique=True)




# def upsert_many_images(img_paths):

# 	# TODO(hichame): replace this by query + batch insert
# 	# It will assume no transaction occur between query and insert

# 	for path in img_paths:
# 		insert_label_to_mongodb({'img_path': path,
# 								 'is_labelled': False})


def delete_label(data):
	result = db.labels_db.update_one({'img_path': data['img_path']}, 
								 {'$set': {'is_labelled': False, 
										   'bbs': [],
										   'category': '',
										   'orientation': ''}})


def select_label(img_path):
	label = []

	try:
		label = db.labels_db.find({'img_path': img_path})[0]
		
		del label['_id'] # not json-friendly object
		print('Client requests labels for image {}: existing labels found'.format(img_path))

	except Exception as e:
		print('Client requests labels for image {}: None found.'.format(img_path))

	return label


# def get_all_labelled_images():
# 	labelled_img_paths = db.labels_db.distinct('img_path')

# 	return labelled_img_paths


# def get_all_labels_from_mongodb():
# 	all_labels = list(db.labels_db.find({'is_labelled': True}))

# 	return all_labels


def select_all(query_dict={}):
	return list(db.labels_db.find(query_dict))


def count_labels():
	return int(db.labels_db.count({'is_labelled': True}))