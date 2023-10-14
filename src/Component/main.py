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
async def walletdetails(addressId: str):
    driver = GraphDatabase.driver(uri, auth=(user, password))
    session = driver.session(database="neo4j")

    query = "MATCH (a:wallet {addressId: '"+addressId+"'})-[:SENT_TO]->(b:wallet) RETURN a, b, [(a)-[r:SENT_TO]->(b) | { _nodes: [a, b], _relationships: r }] AS relationships;"

    result = session.run(query)

    results_list = []

    for record in result:
        relationships = record["relationships"]

        # Append each relationship to the result list
        for relationship in relationships:
            results_list.append([relationship])

    formatted_result = []

    for item in results_list:
        formatted_item = {
            "_nodes": item[0]["_nodes"],
            "_relationships": [{
                "gas_price": item[0]["_relationships"]["gas_price"],
                "block_timestamp": item[0]["_relationships"]["block_timestamp"],
                "gas_used": item[0]["_relationships"]["gas_used"],
                "gas": item[0]["_relationships"]["gas"],
                "transaction_fee": item[0]["_relationships"]["transaction_fee"],
                "block_number": item[0]["_relationships"]["block_number"],
                "value": item[0]["_relationships"]["value"],
                "hash": item[0]["_relationships"]["hash"]
            }]
        }
        formatted_result.append([formatted_item])

    session.close()
    driver.close()
    return formatted_result


@app.get("/WalletFrom")
async def walletdetailsfrom(addressId:str):
    driver = GraphDatabase.driver(uri, auth=(user, password))
    session = driver.session(database="neo4j")


    query = "MATCH (a:wallet)-[:RECEIVED_FROM]->(b:wallet {addressId: '"+addressId+"'}) RETURN a, b, [(a)-[r:RECEIVED_FROM]->(b) | { _nodes: [a, b], _relationships: r }] AS relationships;"

    result = session.run(query)

    results_list = []

    for record in result:
        relationships = record["relationships"]

        # Append each relationship to the result list
        for relationship in relationships:
            results_list.append([relationship])

    formatted_result = []

    for item in results_list:
        formatted_item = {
            "_nodes": item[0]["_nodes"],
            "_relationships": [{
                "gas_price": item[0]["_relationships"]["gas_price"],
                "block_timestamp": item[0]["_relationships"]["block_timestamp"],
                "gas_used": item[0]["_relationships"]["gas_used"],
                "gas": item[0]["_relationships"]["gas"],
                "transaction_fee": item[0]["_relationships"]["transaction_fee"],
                "block_number": item[0]["_relationships"]["block_number"],
                "value": item[0]["_relationships"]["value"],
                "hash": item[0]["_relationships"]["hash"]
            }]
        }
        formatted_result.append([formatted_item])

    session.close()
    driver.close()
    return formatted_result

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



