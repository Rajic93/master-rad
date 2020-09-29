

from keras.layers import Input, Embedding, Dot, Reshape, Dense
from keras.models import Model
import numpy as np
import random
import csv



from keras.layers import Input, Embedding, Dot, Reshape, Dense
from keras.models import Model
import numpy as np
import random
import csv




tag_ids = []
tag_id_to_name = {}
name_to_tag_id = {}

with open('./tags.csv', encoding = 'utf8') as book_tag:
    csv_reader = csv.reader(book_tag, delimiter = ',')
    row_count = 0
    for row in csv_reader:
        if row_count == 0:
            row_count += 1
            pass
        else:
            tag_ids.append(int(row[0]))
            tag_id_to_name.update({ int(row[0]): row[1] })
            name_to_tag_id.update({ row[1]: int(row[0]) })
            row_count += 1


# In[5]:


pairs = []
with open('./book_tags.csv', encoding = 'utf8') as book_tag:
    csv_reader = csv.reader(book_tag, delimiter = ',')
    row_count = 0
    for row in csv_reader:
        if row_count == 0:
            row_count += 1
            pass
        else:
            pairs.append((g_book_ids[int(row[0])], int(row[1])))


# In[6]:


pairs_set = set(pairs)


# In[16]:


def generate_batch(pairs, n_positive = 50, negative_ratio = 1.0, classification = False):
    """Generate batches of samples for training"""
    batch_size = n_positive * (1 + negative_ratio)
    batch = np.zeros((batch_size, 3))

    # Adjust label based on task
    if classification:
        neg_label = 0
    else:
        neg_label = -1

    # This creates a generator
    while True:
        # randomly choose positive examples
        for idx, (book_id, tag_id) in enumerate(random.sample(pairs, n_positive)):
            batch[idx, :] = (book_id, tag_id, 1)

        # Increment idx by 1
        idx += 1

        # Add negative examples until reach batch size
        while idx < batch_size:
            # random selection
            random_book = random.randrange(max(book_ids))
            random_tag = random.randrange(max(tag_ids))



            # Check to make sure this is not a positive example
            if (random_book, random_tag) not in pairs_set:

                # Add to batch and increment index
                batch[idx, :] = (random_book, random_tag, neg_label)
                idx += 1

        # Make sure to shuffle order
        np.random.shuffle(batch) batch[:, 1]}, batch[:, 2])
        yield {'book': batch[:, 0], 'tag': batch[:, 1]}, batch[:, 2]


# In[17]:


next(generate_batch(pairs, n_positive = 2, negative_ratio = 2))


# In[25]:


def book_embedding_model(embedding_size = 50, classification = False):
    """Model to embed books and wikilinks using the functional API.
       Trained to discern if a link is present in a article"""
    # Both inputs are 1-dimensional
    book = Input(name = 'book', shape = [1])
    tag = Input(name = 'tag', shape = [1])
    # Embedding the book (shape will be (None, 1, 50))
    book_embedding = Embedding(name = 'book_embedding',
                               input_dim = max(book_ids) * 2,
                               output_dim = embedding_size)(book)
    # Embedding the link (shape will be (None, 1, 50))
    tag_embedding = Embedding(name = 'tags_embedding',
                               input_dim = max(tag_ids) * 2,
                               output_dim = embedding_size)(tag)
    # Merge the layers with a dot product along the second axis (shape will be (None, 1, 1))
    merged = Dot(name = 'dot_product', normalize = True, axes = 2)([book_embedding, tag_embedding])
    # Reshape to be a single number (shape will be (None, 1))
    merged = Reshape(target_shape = [1])(merged)
    # If classifcation, add extra layer and loss function is binary cross entropy
    if classification:
        merged = Dense(1, activation = 'sigmoid')(merged)
        model = Model(inputs = [book, tag], outputs = merged)
        model.compile(optimizer = 'Adam', loss = 'binary_crossentropy', metrics = ['accuracy'])
    # Otherwise loss function is mean squared error
    else:
        model = Model(inputs = [book, tag], outputs = merged)
        model.compile(optimizer = 'Adam', loss = 'mse')
    return model
# Instantiate model and show parameters
model = book_embedding_model()
model.summary()


# In[26]:


print('Stats\n-------------------------')
print(f'Number of books: {len(book_ids)}\nMax book id: {max(book_ids)}')
print(f'Number of tags: {len(tag_ids)}\nMax tag id: {max(tag_ids)}')
print(f'Number of pairs: {len(pairs)}')


# In[32]:


import time
import datetime

print(f'Start training at: {datetime.datetime.now().time()}')

n_positive = 1024

gen = generate_batch(pairs, n_positive, negative_ratio = 1)

start = time.time()

# Train
h = model.fit_generator(gen, epochs = 15,
                        steps_per_epoch = len(pairs) // n_positive,
                        verbose = 1)

end = time.time()

print('Total time: ' + str(end - start))


# In[33]:


model.save('initial_training.h5')
