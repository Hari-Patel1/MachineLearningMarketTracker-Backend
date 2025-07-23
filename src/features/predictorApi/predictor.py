# import numpy as np
# import pandas as pd
# import os

# from sklearn.preprocessing import MinMaxScaler
# from sklearn.metrics import mean_squared_error

# import tensorflow as tf
# from keras.models import Sequential
# from keras.layers import Dense, LSTM, Dropout

# from sqlalchemy import create_engine

# # MySQL connection details
# user = "root"
# password = "root"
# host = "localhost"  # e.g., 'localhost'
# port = 3306  # default MySQL port
# database = "projectdb"

# # Create connection string for SQLAlchemy engine
# connection_string = f"mysql+mysqlconnector://{user}:{password}@{host}:{port}/{database}"

# # Create engine
# engine = create_engine(connection_string)

# # Query the 'stock' table
# query = "SELECT * FROM stock"

# # Load data directly into a DataFrame
# dataFrame = pd.read_sql(query, con=engine)

# # Set window size
# window_size = 20

# def create_features(data, window_size):
#     X, Y = [], []
#     for i in range(len(data) - window_size - 1):
#         window = data[i:(i + window_size), 0]
#         X.append(window)
#         Y.append(data[i + window_size, 0])
#     return np.array(X), np.array(Y)

# def predict_next_day_price_for_ticker(df, ticker, window_size=20):
#     # Filter data for the ticker
#     ticker_df = df[df["Ticker"] == ticker].copy()
    
#     # Check if necessary columns exist and drop unused columns
#     drop_cols = ["Id", "Open", "High", "Low", "Volume"]
#     for col in drop_cols:
#         if col in ticker_df.columns:
#             ticker_df = ticker_df.drop(columns=[col])
    
#     if len(ticker_df) < window_size + 2:
#         print(f"Not enough data for ticker {ticker} to make predictions.")
#         return None

#     # Prepare time series
#     timeSeries = ticker_df["Close"].astype("float32").values.reshape(-1, 1)

#     # Scale
#     scaler = MinMaxScaler(feature_range=(0, 1))
#     timeSeries_scaled = scaler.fit_transform(timeSeries)

#     # Split train/test
#     train_data_len = int(len(timeSeries_scaled) * 0.8)
#     train, test = timeSeries_scaled[:train_data_len], timeSeries_scaled[train_data_len:]

#     # Create features and labels
#     X_train, Y_train = create_features(train, window_size)
#     X_test, Y_test = create_features(test, window_size)

#     if len(X_train) == 0 or len(X_test) == 0:
#         print(f"Not enough sequences for ticker {ticker} after creating features.")
#         return None

#     # Reshape for LSTM
#     X_train = X_train.reshape((X_train.shape[0], 1, X_train.shape[1]))
#     X_test = X_test.reshape((X_test.shape[0], 1, X_test.shape[1]))

#     # Set seeds for reproducibility per ticker
#     tf.random.set_seed(11)
#     np.random.seed(11)

#     # Build model
#     model = Sequential()
#     model.add(LSTM(units=50, activation="relu", input_shape=(1, window_size)))
#     model.add(Dropout(0.2))
#     model.add(Dense(1))
#     model.compile(loss="mean_squared_error", optimizer="adam")

#     # Train model (silent)
#     model.fit(X_train, Y_train, epochs=50, batch_size=20, verbose=0, shuffle=False, validation_data=(X_test, Y_test))

#     # Prepare last window for next day prediction
#     last_window = timeSeries_scaled[-window_size:].reshape(1, 1, window_size)

#     # Predict next day scaled value
#     next_day_scaled_pred = model.predict(last_window)

#     # Inverse transform to actual price
#     next_day_pred = scaler.inverse_transform(next_day_scaled_pred)

#     return next_day_pred[0][0]

# # Get unique tickers
# tickers = dataFrame["Ticker"].unique()
# print(f"Found {len(tickers)} unique tickers.")

# # Dictionary to store predictions
# predictions = {}

# for ticker in tickers:
#     print(f"Processing ticker: {ticker}")
#     pred_price = predict_next_day_price_for_ticker(dataFrame, ticker, window_size)
#     if pred_price is not None:
#         predictions[ticker] = pred_price

# print("\nNext day price predictions per ticker:")
# for ticker, price in predictions.items():
#     print(f"{ticker}: {price:.2f}")
# import numpy as np
# import pandas as pd
# import os

# from sklearn.preprocessing import MinMaxScaler
# from sklearn.metrics import mean_squared_error

# import tensorflow as tf
# from keras.models import Sequential
# from keras.layers import Dense, LSTM, Dropout

# from sqlalchemy import create_engine

# # MySQL connection details
# user = "root"
# password = "root"
# host = "localhost"  # e.g., 'localhost'
# port = 3306  # default MySQL port
# database = "projectdb"

# # Create connection string for SQLAlchemy engine
# connection_string = f"mysql+mysqlconnector://{user}:{password}@{host}:{port}/{database}"

# # Create engine
# engine = create_engine(connection_string)

# # Query the 'stock' table
# query = "SELECT * FROM stock"

# # Load data directly into a DataFrame
# dataFrame = pd.read_sql(query, con=engine)

# # Set window size
# window_size = 20

# def create_features(data, window_size):
#     X, Y = [], []
#     for i in range(len(data) - window_size - 1):
#         window = data[i:(i + window_size), 0]
#         X.append(window)
#         Y.append(data[i + window_size, 0])
#     return np.array(X), np.array(Y)

# def predict_next_day_price_for_ticker(df, ticker, window_size=20):
#     # Filter data for the ticker
#     ticker_df = df[df["Ticker"] == ticker].copy()
    
#     # Check if necessary columns exist and drop unused columns
#     drop_cols = ["Id", "Open", "High", "Low", "Volume"]
#     for col in drop_cols:
#         if col in ticker_df.columns:
#             ticker_df = ticker_df.drop(columns=[col])
    
#     if len(ticker_df) < window_size + 2:
#         print(f"Not enough data for ticker {ticker} to make predictions.")
#         return None

#     # Prepare time series
#     timeSeries = ticker_df["Close"].astype("float32").values.reshape(-1, 1)

#     # Scale
#     scaler = MinMaxScaler(feature_range=(0, 1))
#     timeSeries_scaled = scaler.fit_transform(timeSeries)

#     # Split train/test
#     train_data_len = int(len(timeSeries_scaled) * 0.8)
#     train, test = timeSeries_scaled[:train_data_len], timeSeries_scaled[train_data_len:]

#     # Create features and labels
#     X_train, Y_train = create_features(train, window_size)
#     X_test, Y_test = create_features(test, window_size)

#     if len(X_train) == 0 or len(X_test) == 0:
#         print(f"Not enough sequences for ticker {ticker} after creating features.")
#         return None

#     # Reshape for LSTM
#     X_train = X_train.reshape((X_train.shape[0], 1, X_train.shape[1]))
#     X_test = X_test.reshape((X_test.shape[0], 1, X_test.shape[1]))

#     # Set seeds for reproducibility per ticker
#     tf.random.set_seed(11)
#     np.random.seed(11)

#     # Build model
#     model = Sequential()
#     model.add(LSTM(units=50, activation="relu", input_shape=(1, window_size)))
#     model.add(Dropout(0.2))
#     model.add(Dense(1))
#     model.compile(loss="mean_squared_error", optimizer="adam")

#     # Train model (silent)
#     model.fit(X_train, Y_train, epochs=50, batch_size=20, verbose=0, shuffle=False, validation_data=(X_test, Y_test))

#     # Prepare last window for next day prediction
#     last_window = timeSeries_scaled[-window_size:].reshape(1, 1, window_size)

#     # Predict next day scaled value
#     next_day_scaled_pred = model.predict(last_window)

#     # Inverse transform to actual price
#     next_day_pred = scaler.inverse_transform(next_day_scaled_pred)

#     return next_day_pred[0][0]

# # Get unique tickers
# tickers = dataFrame["Ticker"].unique()
# print(f"Found {len(tickers)} unique tickers.")

# # Dictionary to store predictions
# predictions = {}

# for ticker in tickers:
#     print(f"Processing ticker: {ticker}")
#     pred_price = predict_next_day_price_for_ticker(dataFrame, ticker, window_size)
#     if pred_price is not None:
#         predictions[ticker] = pred_price

# print("\nNext day price predictions per ticker:")
# for ticker, price in predictions.items():
#     print(f"{ticker}: {price:.2f}")


def machineLearningModel():

    import numpy as np
    import pandas as pd
    import os

    from sklearn.preprocessing import MinMaxScaler
    from sklearn.metrics import mean_squared_error

    import tensorflow as tf
    from keras.models import Sequential
    from keras.layers import Dense, LSTM, Dropout

    from sqlalchemy import create_engine
    import mysql.connector 

    print("Finished the machine learning process...")


    # MySQL connection details
    user = "root"
    password = "root"
    host = "localhost"  # e.g., 'localhost'
    port = 3306  # default MySQL port
    database = "projectdb"

    # Create connection string for SQLAlchemy engine
    connection_string = f"mysql+mysqlconnector://{user}:{password}@{host}:{port}/{database}"

    # Create engine
    engine = create_engine(connection_string)

    # Query the 'stock' table
    query = "SELECT * FROM stock"

    # Load data directly into a DataFrame
    dataFrame = pd.read_sql(query, con=engine)

    # Set window size
    window_size = 20

    def create_features(data, window_size):
        X, Y = [], []
        for i in range(len(data) - window_size - 1):
            window = data[i:(i + window_size), 0]
            X.append(window)
            Y.append(data[i + window_size, 0])
        return np.array(X), np.array(Y)

    def predict_next_day_price_for_ticker(df, ticker, cursor, window_size=20):
        # Filter data for the ticker
        ticker_df = df[df["Ticker"] == ticker].copy()
        
        # Drop unused columns if present
        drop_cols = ["Id", "Open", "High", "Low", "Volume"]
        for col in drop_cols:
            if col in ticker_df.columns:
                ticker_df = ticker_df.drop(columns=[col])
        
        if len(ticker_df) < window_size + 2:
            print(f"Not enough data for ticker {ticker} to make predictions.")
            return None

        # Prepare time series
        timeSeries = ticker_df["Close"].astype("float32").values.reshape(-1, 1)

        # Scale
        scaler = MinMaxScaler(feature_range=(0, 1))
        timeSeries_scaled = scaler.fit_transform(timeSeries)

        # Split train/test
        train_data_len = int(len(timeSeries_scaled) * 0.8)
        train, test = timeSeries_scaled[:train_data_len], timeSeries_scaled[train_data_len:]

        # Create features and labels
        X_train, Y_train = create_features(train, window_size)
        X_test, Y_test = create_features(test, window_size)

        if len(X_train) == 0 or len(X_test) == 0:
            print(f"Not enough sequences for ticker {ticker} after creating features.")
            return None

        # Reshape for LSTM
        X_train = X_train.reshape((X_train.shape[0], 1, X_train.shape[1]))
        X_test = X_test.reshape((X_test.shape[0], 1, X_test.shape[1]))

        # Set seeds for reproducibility per ticker
        tf.random.set_seed(11)
        np.random.seed(11)

        # Build model
        model = Sequential()
        model.add(LSTM(units=50, activation="relu", input_shape=(1, window_size)))
        model.add(Dropout(0.2))
        model.add(Dense(1))
        model.compile(loss="mean_squared_error", optimizer="adam")

        # Train model (silent)
        model.fit(X_train, Y_train, epochs=50, batch_size=20, verbose=0, shuffle=False, validation_data=(X_test, Y_test))

        # Prepare last window for next day prediction
        last_window = timeSeries_scaled[-window_size:].reshape(1, 1, window_size)

        # Predict next day scaled value
        next_day_scaled_pred = model.predict(last_window)

        # Inverse transform to actual price
        next_day_pred = scaler.inverse_transform(next_day_scaled_pred)[0][0]

        # Insert or update prediction in the database
        insert_sql = """
        INSERT INTO Prediction (Ticker, Close)
        VALUES (%s, %s)
        ON DUPLICATE KEY UPDATE Close = VALUES(Close)
        """

        # cursor.execute(insert_sql, (ticker, round(next_day_pred, 2)))


        cursor.execute(insert_sql, (ticker, round(float(next_day_pred), 2)))


        return next_day_pred

    # Connect to MySQL for insertions
    db_conn = mysql.connector.connect(
        user=user,
        password=password,
        host=host,
        port=port,
        database=database
    )
    db_cursor = db_conn.cursor()

    # Get unique tickers
    tickers = dataFrame["Ticker"].unique()
    print(f"Found {len(tickers)} unique tickers.")

    # Dictionary to store predictions
    predictions = {}

    for ticker in tickers:
        print(f"Processing ticker: {ticker}")
        pred_price = predict_next_day_price_for_ticker(dataFrame, ticker, db_cursor, window_size)
        if pred_price is not None:
            predictions[ticker] = pred_price
            print(f"Predicted next day price for {ticker}: {pred_price:.2f}")

    # Commit all inserts to the database
    db_conn.commit()

    # Close cursor and connection
    db_cursor.close()
    db_conn.close()

    print("\nNext day price predictions per ticker:")
    for ticker, price in predictions.items():
        print(f"{ticker}: {price:.2f}")

    print("\nAll predictions have been inserted/updated in the Prediction table.")

machineLearningModel()