import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import "./App.css";
import bucket from "./bucket.png";

// Google Maps
var APIkey = "AIzaSyChKzCo94RAilpNe8MQOzBMjYC7XhuaEGs";

const BucketMarker = ({ openBucket, storeId }) => {
  return (
    <img src={bucket} alt="marker"
      style={{ width: "70px", height: "90px", margin: "-45px 0 0 -35px" }}
      onClick={() => openBucket({ storeId })} />
  )
};

const BucketList = ({ bucket }) => {
  return (
    bucket.map(item => (
      <li key={item.name}> {item.name} : {item.value}</li>
    ))
  )
}

class BucketMap extends Component {
  //requests
  constructor(props) {
    super(props);
    this.state = {
      buckets: [],
      stores: [],
      currentBucket: [],
      showBucket: false
    };
    this.openBucket = this.openBucket.bind(this);
    this.closeBucket = this.closeBucket.bind(this);
  }

  openBucket(storeId) {
    var entries = []
    var guids = this.state.buckets.map((bucket) => {
      var name = bucket.productString
      var keys = Object.keys(bucket.stockByStoreGUID)
      var values = Object.values(bucket.stockByStoreGUID)
      for (var i = 0; i < keys.length; i++) {
        if (keys[i] === storeId.storeId) {
          var entry = { name: name, value: values[i] }
          entries.push(entry)
          console.log("1. " + JSON.stringify(entry))
        }
      }
      return "200ok"
    });
    console.log(guids[0])


    this.setState({ showBucket: true, currentBucket: entries }, () => {
      document.addEventListener('click', this.closeBucket);
    });
    console.log("3. " + this.state.currentBucket)
  }

  closeBucket(event) {
    if (!this.bucketMenu.contains(event.target)) {
      this.setState({ showBucket: false }, () => {
        document.removeEventListener('click', this.closeBucket);
      });
    }
  }

  componentDidMount() {
    var that = this;
    const url = "/api/products/containers/buckets";
    fetch(url)
      .then(function (response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function (data) {
        that.setState({ buckets: data });
      });
    const storeUrl = "/api/stores";
    fetch(storeUrl)
      .then(function (response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function (data) {
        that.setState({ stores: data });
      });
  }

  // map props
  static defaultProps = {
    center: {
      lat: 60.4500,
      lng: 22.2933
    },
    zoom: 5
  };

  // rendering
  render() {
    return (
      <div style={{
        backgroundColor: "#282c34"
      }}>
        <div style={{
          // header
          height: "15vh",
          color: "white",
          paddingTop: "10px"
        }}>
          <div style={{
            // title
            textAlign: "center",
            fontSize: "22px"
          }}>
            <h1>BucketFinder</h1>
          </div>
          <div style={{
            // motto
            textAlign: "center",
            fontSize: "17px",
          }}>
            <p>Worlds most extensive bucket-retailer locator</p>
          </div>
        </div>
        <div style={{ height: "70vh", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: APIkey }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          >
            {this.state.stores.map(item => (
              <BucketMarker
                key={item.guid}
                lat={item.latitude}
                lng={item.longitude}
                openBucket={this.openBucket.bind(this)}
                storeId={item.guid}
                state={this.state}>
              </BucketMarker>
            ))}
            {
              this.state.showBucket
                ? (
                  <div
                    className="menu"
                    ref={(element) => {
                      this.bucketMenu = element;
                    }}
                  >
                    <div id="list">
                      <BucketList bucket={this.state.currentBucket}>
                      </BucketList>
                    </div>
                  </div>
                )
                : (
                  null
                )
            }
          </GoogleMapReact>
        </div>
        <div style={{
          color: "white",
          paddingTop: "20px"
        }}>
          <div style={{
            // bottom
            textAlign: "center",
            fontSize: "25px",
            fontFamily: "Lora, serif",
            fontWeight: "lighter"
          }}>
            <a href="https://g-market.herokuapp.com/">Powered by G-Market</a>
          </div>
        </div>
      </div>
    );
  }
}

export default BucketMap;
