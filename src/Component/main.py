# Backend Script Example

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from neo4j import GraphDatabase

# for security reasons
# you can store your database information in a separate file
uri = "neo4j+s://19b5ded5.databases.neo4j.io"
user = "neo4j"
password = "eS87GcULkCOLvQeqHzIiRtftod6AbfkzhPCcuOx_iUY"

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def mainpage():
    return ("backend connected successfully")

@app.get("/WalletDetails")
async def walletdetails(addressId:str):
    print(addressId)
    driver = GraphDatabase.driver(uri, auth=(user, password))
    session = driver.session(database="neo4j")


    query = "MATCH (a:wallet {addressId: '0xb0606f433496bf66338b8ad6b6d51fc4d84a44cd'})-[:SENT_TO]->(b:wallet) RETURN a, b, [(a)-[r:SENT_TO]->(b) | r] AS sent_relationships;"
    print(query)

    result = session.run(query)

     # Initialize an empty list to store results
    results_list = []

    # Iterate over the query results and append them to the list
    for record in result:
        results_list.append(record)

    # Close the session and driver when done
    session.close()
    driver.close()

    return results_list

@app.get("/WalletFrom")
async def walletdetailsfrom(addressId:str):
    driver = GraphDatabase.driver(uri, auth=(user, password))
    session = driver.session(database="neo4j")


    query = "MATCH p=(target)-[:RECEIVED_FROM]->(source:wallet {addressId: '"+addressId+"'}) RETURN p;"
    print(query)

    result = session.run(query)

     # Initialize an empty list to store results
    results_list = []

    # Iterate over the query results and append them to the list
    for record in result:
        results_list.append(record)

    # Close the session and driver when done
    session.close()
    driver.close()

    return results_list

@app.get("/allwallet")
async def walletdetailsfrom():
    driver = GraphDatabase.driver(uri, auth=(user, password))
    session = driver.session(database="neo4j")


    query = "MATCH (n:wallet) RETURN n LIMIT 25;"

    result = session.run(query)

     # Initialize an empty list to store results
    results_list = []

    # Iterate over the query results and append them to the list
    for record in result:
        results_list.append(record)

    # Close the session and driver when done
    session.close()
    driver.close()

    return results_list



