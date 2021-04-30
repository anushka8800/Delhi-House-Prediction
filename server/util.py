import json
import pickle
import numpy as np

__furnishing_status = None
__data_columns = None
__model = None

def get_price(area,bhk,bathroom,parking,furnishing_status):
    try:
        fur_index = __data_columns.index(furnishing_status.lower())
    except:
        fur_index = -1

    x = np.zeros(len(__data_columns))
    x[0] = area
    x[1] = bhk
    x[2] = bathroom
    x[3] = parking
    if fur_index >=0:
        x[fur_index] = 1

    return round((__model.predict([x])[0]),2)

def get_furnishing_status():
    return __furnishing_status

def load_saved_artifacts():
    print('loading saved artifacts...')
    global __data_columns
    global __furnishing_status
    global __model
    with open('./artifacts/columns.json','r') as f:
        __data_columns = json.load(f)['data_columns']
        __furnishing_status = __data_columns[7:]

    with open('./artifacts/DHP_model.pickle','rb') as f:
        __model = pickle.load(f)

    print('loading artifacts is... done')

if __name__ == '__main__':
    load_saved_artifacts()
    print(get_furnishing_status())
    print(__data_columns)

    print(get_price(950,2,2,1,'furnishing_furnished'))