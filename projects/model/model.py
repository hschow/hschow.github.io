import pandas as pd
import sklearn as k
import sklearn.linear_model
import sklearn.model_selection
import numpy as np
import scipy.stats



rankings = pd.read_csv("C:/cygwin64/home/henry/random_stuff/marchMadness/kenpom_rankings.csv")
past = pd.read_csv("C:/cygwin64/home/henry/random_stuff/marchMadness/past_games.csv")
future = pd.read_csv("C:/cygwin64/home/henry/random_stuff/marchMadness/future_games.csv")
matches = pd.read_csv("C:/cygwin64/home/henry/random_stuff/marchMadness/games.csv")
cand = pd.read_csv("C:/cygwin64/home/henry/random_stuff/marchMadness/2021_Champ_canidates.csv")
f4info = pd.read_csv("C:/cygwin64/home/henry/random_stuff/marchMadness/FF_past_data.csv")

ffcans = cand.copy()

champCan = pd.DataFrame({'away': ['Gonzaga', 'Michigan', 'Illinois', 'Gonzaga','Michigan', 'Gonzaga'],
                         'home': ['Houston','Houston','Houston','Illinois', 'Illinois', 'Michigan'],
                         'winner': ['Gonzaga', 'Michigan', 'Illinois','Illinois', 'Michigan', 'Michigan']})

rankings.columns
rank = rankings.copy()
rankings = rankings.loc[:,['AdjEM', 'AdjO', 'OppO', 'OppD', 'AdjEM.1', 'AdjEM.2', 'Team']]


matchups = matches.loc[:, ['away', 'home', 'region', 'higher_seed', 'lower_seed']]

def rowCom(arr1, arr2, x):
    arr = []
    for i in range(len(arr1)):
        arr.insert(0,compare(arr1[i], arr2[i], x))
    return arr
    

def getData(name):
    for i in range(rankings.shape[0]):
        if (rankings.loc[i, 'Team'] == name):
            return rankings.loc[i, :]
    return rankings.loc[(rankings.shape[0] - 1), :]


def winners(arr1, arr2):
    w = []
    for i in range(len(arr1)):
        w.insert(0, winner(arr1, arr2, i))
    return w

def fillData(o):
    x = []
    for i in range(len(o)):
        x.append(getData(o[i]))
    return x


def sim(past, matchups):
    data = pd.DataFrame
    x = fillData(past.away)
    y = fillData(past.home)
    z = fillData(past.winner)
    data = [x, y, z]
    
    test_data = pd.DataFrame
    tx = fillData(matchups.away)
    ty = fillData(matchups.home)
#    tz = fillData(champCan.winner)
    test_data = [tx, ty] # if winners are knwon add a 3rd element tz
    
#    test_data[1][1]
    
    AdejEM = rowCom(data[0], data[1], 0)
    AdjO = rowCom(data[0], data[1], 1)
    OppO = rowCom(data[0], data[1], 2)
    OppD = rowCom(data[0], data[1], 3)
    AdjEM2 =  rowCom(data[0], data[1], 4)
    AdjEM3 = rowCom(data[0], data[1], 5)
    win = winners(data[0],data[2])
    train_cols = {
        'AdejEM': AdejEM,
        'AdjO': AdjO,
        'OppO': OppO,
        'OppD': OppD,
        'AdjEM2': AdjEM2,
        'AdjEM3': AdjEM3,
        'winner': win
        }
    
    train = pd.DataFrame(train_cols, columns = ['AdejEM', 'AdjO', 'OppO', 'OppD', 'AdjEM2', 'AdjEM3', 'winner'])
    
    tAdejEM = rowCom(test_data[0], test_data[1], 0)
    tAdjO = rowCom(test_data[0], test_data[1], 1)
    tOppO = rowCom(test_data[0], test_data[1], 2)
    tOppD = rowCom(test_data[0], test_data[1], 3)
    tAdjEM2 =  rowCom(test_data[0], test_data[1], 4)
    tAdjEM3 = rowCom(test_data[0], test_data[1], 5)
#    twin = winners(test_data[0],test_data[2])
    test_cols = {
        'AdejEM': tAdejEM,
        'AdjO': tAdjO,
        'OppO': tOppO,
        'OppD': tOppD,
        'AdjEM2': tAdjEM2,
        'AdjEM3': tAdjEM3
        }
    
    test = pd.DataFrame(test_cols, columns = ['AdejEM', 'AdjO', 'OppO', 'OppD', 'AdjEM2', 'AdjEM3'])
    
    df_train = train[['AdejEM', 'AdjO', 'OppO', 'OppD', 'AdjEM2', 'AdjEM3']]
    labels_train = train['winner']
    df_test = test[['AdejEM', 'AdjO', 'OppO', 'OppD', 'AdjEM2', 'AdjEM3']]
    
    df_train['I'] = np.zeros(df_train.shape[0])
    df_train = df_train.loc[:,['I', 'AdejEM', 'AdjO', 'OppO', 'OppD', 'AdjEM2', 'AdjEM3']]
    
    df_test['I'] = np.zeros(df_test.shape[0])
    df_test = df_test.loc[:,['I', 'AdejEM', 'AdjO', 'OppO', 'OppD', 'AdjEM2', 'AdjEM3']]


    betas = binary_min_L(df_train, labels_train)
    
    odds = get_pred(df_test, betas)
    
   # modelt = k.linear_model.LogisticRegression()
   # modelt.fit(df_train, labels_train)
   # y_pred = modelt.predict(df_test)
    
    y_pred = simulate(odds)
   
#    next = advanced(y_pred)
    #print(next)
    return y_pred, odds


pow6 = ['B10',  'BE','B12', 'ACC', 'SEC', 'P12']

def advanced(arr1, arr2, n):
    arr = []
    for i in range(n):
        if (arr2[i]==1):
            arr = np.append(arr, arr1.loc[i, 'home'])
        else: 
            arr = np.append(arr, arr1.loc[i, 'away'])  
    return arr


def winner(arr1, arr2, x):
    if (arr1[x][6] == arr2[x][6]):
        return 0
    return 1

def string_compare(x, y):
    if (x == y):
        return 0;
    elif((x in pow6) & (y in pow6)):
        return 3;
    elif((x in pow6) & (y not in pow6)):
        return -10;
    elif((x not in pow6) & (y in pow6)):
        return 10;
    else:
        return 1;
        

def compare(arr1, arr2, x):
    if (~(type(arr1[x])==str)):
        return arr1[x]-arr2[x]
    return string_compare(arr1[x], arr2[x])


def sigmoid(u):
    expu = np.exp(u)
    return expu/(expu+1)

def binary_cross_entropy(p,q):
    return -(p*np.log(q)) - ((1-p)*np.log(1-q))


def cross_entropy(p,q):
    return -np.sum(p*np.log(q))

def binary_L(X, y_oneHot, beta):
    N = X.shape[0]
    s = 0
    for j in range(N):
        xi = X.loc[j,:]
        yi = y_oneHot.loc[j]
        s += cross_entropy(yi, sigmoid(np.vdot(beta,xi)))    
    return s/N

def binary_gradL(X, y, beta):
    N = X.shape[0]
    s = 0
    for i in range(N):
        s += ((sigmoid(np.vdot(X.loc[i,:].T, beta)) - y.loc[i])*X.loc[i,:].T)
    return s/N

def binary_min_L(X, y):
    lr = .009
    N, d = X.shape
    beta_t =  np.zeros(d)
    for t in range(240):
        beta_t = beta_t - (lr * binary_gradL(X,y,beta_t))
    return beta_t

def get_pred(X, beta):
    arr1 = np.zeros(X.shape[0])
    for i in range(X.shape[0]):
        arr1[i] = sigmoid(np.vdot(X.loc[i,:], beta))
    return arr1

def simulate(arr):
    a = np.ones(arr.shape[0])
    for i in range(arr.shape[0]):
        x = np.random.rand()
        if (x>arr[i]):
            a[i] = 0
    return a
