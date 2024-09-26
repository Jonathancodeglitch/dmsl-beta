import pg from "pg";

const db = new pg.Pool({
  connectionString: process.env.POSTGRES_URL,
});

//connect to database
//db.connect().catch((err) => console.error("Connection error:", err));

async function saveAccessTokenToDb(accessToken) {
  const accessTokenJSONString = JSON.stringify(accessToken);
  try {
    //check if accessToken already exist in the database!!
    const doesAccessTokenExist = await db.query(
      "SELECT access_token FROM aweber_auth"
    );

    //if it does not exist Insert it in the database
    if (doesAccessTokenExist.rows.length === 0) {
      await db.query("INSERT INTO aweber_auth (access_token) VALUES ($1)", [
        accessTokenJSONString,
      ]);
      console.log("access token has been saved!!");
    } else {
      //If it does exist then update the current access token there
      await db.query("UPDATE aweber_auth SET access_token = $1", [
        accessTokenJSONString,
      ]);
      console.log("access token has been refreshed!!");
    }
  } catch (err) {
    console.log(`${err} while trying to insect data inside the data base`);
  }
}

//Retrive the data from DB
async function retriveAccessTokenFromDb() {
  try {
    const res = await db.query("SELECT access_token FROM aweber_auth");
    if (res.rows.length > 0) {
      const accessTokenJSONString = res.rows[0].access_token;
      //convert access token from string to its original struture
      const accessToken = JSON.parse(accessTokenJSONString);
      return accessToken;
    } else {
      console.log("No access token found.");
      return null;
    }
  } catch (err) {
    console.error("Error retrieving access token:", err);
  }
}

export { saveAccessTokenToDb, retriveAccessTokenFromDb };
