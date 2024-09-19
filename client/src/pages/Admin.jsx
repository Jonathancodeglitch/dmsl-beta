export default function Admin() {
  //connect to my aweber accout
  return (
    <form action="http://localhost:8000/oauth2" method="get">
      <button className="btn" style={{ marginBlock: "100px" }}>
        CONNECT TO AWEBER
      </button>
    </form>
  );
}
