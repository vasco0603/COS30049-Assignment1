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
        'MATCH p=((w:wallet {addressId: "'+addressId+'"})-[:SENT_TO]->()) RETURN p;'
    )
    print(query)

    result = session.run(query)

    results_list = []
    for record in result:
        results_list.append(record)

    session.close()
    driver.close()
    print(results_list)
    return results_list

# Define a route for retrieving wallet details from a specific address
@app.get("/WalletFrom")
async def walletdetails(addressId: str):
    driver = GraphDatabase.driver(uri, auth=(user, password))
    session = driver.session(database="neo4j")

    # Cypher query to retrieve wallet details and related relationships
    query = (
        'MATCH p=((w:wallet)<-[:RECEIVED_FROM]-(x:wallet {addressId: "'+addressId+'"})) RETURN p;'
    )
    print(query)

    result = session.run(query)

    results_list = []
    for record in result:
        results_list.append(record)

    session.close()
    driver.close()
    print(results_list)
    return results_list

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
