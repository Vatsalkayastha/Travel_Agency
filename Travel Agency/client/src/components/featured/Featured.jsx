import useFetch from "../../hooks/useFetch";
import "./featured.css";

const Featured = () => {
  const { data, loading, error } = useFetch(
    "https://wizardingworldserver.onrender.com/api/hotels/countByCity?cities=berlin,mardid,london"
  );

  return (
    <div className="featured">
      {loading ? (  
        "Loading please wait"
      ) : (
        <>
          <div className="featuredItem">
            <img
              src="https://previews.123rf.com/images/jiawangkun/jiawangkun1911/jiawangkun191100035/139613013-hogsmeade-village-in-the-wizarding-world-of-harry-potter-in-universal-orlando-florida-usa.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Hogsmeade Village</h1>
              {/* <h2>{data[0]} properties</h2> */}
            </div>
          </div>

          <div className="featuredItem">
            <img
              src="https://images.unsplash.com/photo-1548630826-2ec01a41f48f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Diagon Alley</h1>
              {/* <h2>{data[1]} properties</h2> */}
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://static.onecms.io/wp-content/uploads/sites/6/2016/01/kit-1.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Hogwarts School</h1>
              {/* <h2>{data[2]} properties</h2> */}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
