import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import keras
import os
import csv
import json

class Recommender:
    def loadData(self, path, ids, names, nameIndex):
        with open(path, encoding = 'utf8') as data:
            csv_reader = csv.reader(data, delimiter = ',')
            row_count = 0
            for row in csv_reader:
                if row_count == 0:
                    row_count += 1
                    pass
                else:
                    ids.update({ int(row[0]): row[nameIndex] })
                    names.update({ row[nameIndex]: int(row[0]) })
                    row_count += 1

    def loadModel(self, path):
        model = keras.models.load_model(path)
        return model

    def initWeights(self, model):
        book_layer = model.get_layer('book_embedding')
        book_weights = book_layer.get_weights()[0]
        book_weights = book_weights / np.linalg.norm(book_weights, axis = 1).reshape((-1, 1))
        return book_weights

    def find_similar(self, name, weights,
     title_to_book_id, book_id_to_title, name_to_tag_id, tag_id_to_name,
     index_name = 'book', n = 10, least = False, return_dist = False, plot = False):
        """Find n most similar items (or least) to name based on embeddings. Option to also plot the results"""

        # Select index and reverse index
        if index_name == 'book':
            index = title_to_book_id
            rindex = book_id_to_title
            #index = {}
            #rindex = {}
        elif index_name == 'page':
            index = name_to_tag_id
            rindex = tag_id_to_name
            #index = {}
            #rindex = {}

        # Check to make sure `name` is in index
        try:
            # Calculate dot product between book and all others
            dists = np.dot(weights, weights[index[name]])
        except KeyError as ke:
            print('{name} Not Found.')
            return

        # Sort distance indexes from smallest to largest
        sorted_dists = np.argsort(dists)

        # Plot results if specified
        if plot:

            # Find furthest and closest items
            furthest = sorted_dists[:(n // 2)]
            closest = sorted_dists[-n-1: len(dists) - 1]
            items = [rindex[c] for c in furthest]
            items.extend(rindex[c] for c in closest)

            # Find furthest and closets distances
            distances = [dists[c] for c in furthest]
            distances.extend(dists[c] for c in closest)

            colors = ['r' for _ in range(n //2)]
            colors.extend('g' for _ in range(n))

            data = pd.DataFrame({'distance': distances}, index = items)

            # Horizontal bar chart
            data['distance'].plot.barh(color = colors, figsize = (10, 8),
                                       edgecolor = 'k', linewidth = 2)
            plt.xlabel('Cosine Similarity');
            plt.axvline(x = 0, color = 'k');

            # Formatting for italicized title
            name_str = '{index_name.capitalize()}s Most and Least Similar to'
            for word in name.split():
                # Title uses latex for italize
                name_str += ' $\it{' + word + '}$'
            plt.title(name_str, x = 0.2, size = 28, y = 1.05)

            return None

        # If specified, find the least similar
        if least:
            # Take the first n from sorted distances
            closest = sorted_dists[:n]

            print('{index_name.capitalize()}s furthest from {name}.\n')

        # Otherwise find the most similar
        else:
            # Take the last n sorted distances
            closest = sorted_dists[-n:]

            # Need distances later on
            if return_dist:
                return dists, closest

            print('{index_name.capitalize()}s closest to {name}.\n')

        # Need distances later on
        if return_dist:
            return dists, closest


        # Print formatting
        max_width = max([len(rindex[c]) for c in closest])

        # Return the most similar and distances
        results = []

        for c in reversed(closest):
            results.append([book_id_to_title[c].capitalize(), str(dists[c])])

        return results

    def test(self, title):
        directory = os.path.dirname(os.path.realpath(__file__))
        model = self.loadModel(str(directory) + '/initial_training.h5')
        book_weights = self.initWeights(model)
        book_id_to_title = {}
        title_to_book_id = {}
        tag_id_to_name = {}
        name_to_tag_id = {}
        self.loadData(str(directory) + '/books.csv', book_id_to_title, title_to_book_id, 9)
        self.loadData(str(directory) + '/tags.csv', tag_id_to_name, name_to_tag_id, 1)

        results = {};

        # return titles

        # for title in titles:
        #     res = self.find_similar(title, book_weights, title_to_book_id, book_id_to_title, name_to_tag_id, name_to_tag_id)
        #     results.update({ title: res })

        # return results


        
        res = self.find_similar(str(title), book_weights, title_to_book_id, book_id_to_title, name_to_tag_id, name_to_tag_id)
        # self.find_similar("Harry Potter and the Philosopher's Stone", book_weights, title_to_book_id, book_id_to_title, name_to_tag_id, name_to_tag_id, return_dist = True)
        return res
        self.find_similar('Война и миръ', book_weights, title_to_book_id, book_id_to_title, name_to_tag_id, name_to_tag_id, return_dist = True)
        return 'Jeeste'
