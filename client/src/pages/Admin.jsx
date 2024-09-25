export default function Admin() {
  //connect to my aweber accout
  return (
    <form
      action="https://dmsl-beta-xrq6.vercel.app/oauth2/authorize/oauth2"
      method="get"
    >
      <button className="btn" style={{ marginBlock: "100px" }}>
        CONNECT TO AWEBER
      </button>
    </form>
  );
}
