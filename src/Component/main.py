# Backend Script Example

# Import required modules and packages
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from neo4j import GraphDatabase

# Define the URI, user, and password for the Neo4j database
# For security reasons, consider storing these in a separate configuration file
uri = "neo4j+s://19b5ded5.databases.neo4j.io"
user = "neo4j"
password = "eS87GcULkCOLvQeqHzIiRtftod6AbfkzhPCcuOx_iUY"

# Create a FastAPI application
app = FastAPI()

# Define CORS (Cross-Origin Resource Sharing) settings
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define a route for the main page
@app.get("/")
async def mainpage():
    return "Backend connected successfully"

# Define a route for retrieving wallet details
@app.get("/WalletDetails")
async def walletdetails(addressId: str):
    driver = GraphDatabase.driver(uri, auth=(user, password))
    session = driver.session(database="neo4j")

    # Cypher query to retrieve wallet details and related relationships
    query = (
        "MATCH (a:wallet {addressId: '" + addressId + "'})-[:SENT_TO]->(b:wallet) "
        "RETURN a, b, [(a)-[r:SENT_TO]->(b) | { _nodes: [a, b], _relationships: r }] AS relationships;"
    )

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

# Define a route for retrieving wallet details from a specific address
@app.get("/WalletFrom")
async def walletdetailsfrom(addressId: str):
    driver = GraphDatabase.driver(uri, auth=(user, password))
    session = driver.session(database="neo4j")

    # Cypher query to retrieve wallet details and related relationships from a specific address
    query = (
        "MATCH (a:wallet)-[:RECEIVED_FROM]->(b:wallet {addressId: '" + addressId + "'}) "
        "RETURN a, b, [(a)-[r:RECEIVED_FROM]->(b) | { _nodes: [a, b], _relationships: r }] AS relationships;"
    )

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

# Define a route for retrieving details of all wallets (limited to 25)
@app.get("/allwallet")
async def walletdetailsfrom():
    driver = GraphDatabase.driver(uri, auth=(user, password))
    session = driver.session(database="neo4j")

    # Cypher query to retrieve details of all wallets (limited to 25)
    query = "MATCH (n:wallet) RETURN n LIMIT 25;"

    result = session.run(query)

    results_list = []

    # Iterate over the query results and append them to the list
    for record in result:
        results_list.append(record)

    # Close the session and driver when done
    session.close()
    driver.close()

    return results_list

# Define a route for retrieving personal details based on an address
@app.get("/personalDetails")
async def personalDetails(addressId: str):
    driver = GraphDatabase.driver(uri, auth=(user, password))
    session = driver.session(database="neo4j")

    # Cypher query to retrieve personal details based on an address
    query = "MATCH (n:wallet) WHERE n.addressId = '" + addressId + "' RETURN n;"

    result = session.run(query)

    results_list = []

    # Iterate over the query results and append them to the list
    for record in result:
        results_list.append(record)
    print(results_list)

    session.close()
    driver.close()

    return results_list
