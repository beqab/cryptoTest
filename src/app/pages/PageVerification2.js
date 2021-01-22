import React, { Component } from "react";
import { api } from "../api/api";
import { toast } from "react-toastify";
var Onfido = require("onfido-sdk-ui");

export class PageVerification2 extends Component {
  state = {
    loading: false,
  };

  componentDidMount() {
    api.getOnFidoToken().subscribe((data) => {
      Onfido.init({
        // the JWT token that you generated earlier on
        token: data.token,
        // ID of the element you want to mount the component on
        containerId: "onfido-mount",
        // ALTERNATIVE: if your integration requires it, you can pass in the container element instead
        // (Note that if `containerEl` is provided, then `containerId` will be ignored)
        steps: [
          {
            type: "welcome",
            options: {
              title: "cryptoIex verification",
              descriptions: [
                "To open a cryptoIex  account, we will need to verify your identity",

                "It will only take a couple of minutes",
              ],
            },
          },
          "document",
          "face",
        ],
        onComplete: (CompleteData) => {
          console.log(CompleteData, "everything is complete");
          let formData = new FormData();

          let docArray = [
            "document",
            "watchlist_enhanced",
            "facial_similarity_photo",
          ];

          // for (const property in CompleteData) {
          //     if (CompleteData[property].type) {
          //         docArray.push(CompleteData[property].type);
          //     }
          // }
          for (var i = 0; i < docArray.length; i++) {
            formData.append("reportNames[]", docArray[i]);
          }

          api.checkOnFido(formData).subscribe((res) => {
            console.log(res, "check");

            if (res.action === "success") {
              this.startLoad();
            } else {
              toast.error("Something went wrong. Please, try again.");
            }
          });
          // `data` will be an object that looks something like this:
          //
          // {
          //   "document_front": {
          //     "id": "5c7b8461-0e31-4161-9b21-34b1d35dde61",
          //     "type": "passport",
          //     "side": "front"
          //   },
          //   "face": {
          //     "id": "0af77131-fd71-4221-a7c1-781f22aacd01",
          //     "variant": "standard"
          //   }

          //   "document_back": {
          //     "id": "6f63bfff-066e-4152-8024-3427c5fbf45d",
          //     "type": "driving_licence",
          //     "side": "back"
          // }

          //
          // You can now trigger your backend to start a new check
          // `data.face.variant` will return the variant used for the face step
          // this can be used to perform a facial similarity check on the applicant
        },
        onError: (err) => {
          console.log(err, "error :/");
        },
      });
    });
  }

  startLoad = () => {
    this.setState({
      loading: true,
    });
    setTimeout(() => {
      this.setState({
        loading: false,
      });
      this.props.history.push("/dashboard");
    }, 3000);
  };

  render() {
    return (
      <div style={{ position: "relative" }}>
        {this.state.loading && (
          <div class="onfidoSuccess">
            Successfully sent Wait for verification response
          </div>
        )}

        <div id="onfido-mount"></div>
      </div>
    );
  }
}

export default PageVerification2;

// curl https://api.onfido.com/v3/applicants \
//   -H 'Authorization: Token token=api_sandbox.cyYT6LchB2T.YExlBjvDNjZhsMMlj6JWXbCtTN0YuS66' \
//   -d 'first_name=John' \
//   -d 'last_name=Smith'

// $ curl https://api.onfido.com/v3/sdk_token \
//   -H 'Authorization: Token token=api_sandbox.cyYT6LchB2T.YExlBjvDNjZhsMMlj6JWXbCtTN0YuS66' \
//   -F 'applicant_id=07de6c6b-9721-4ba7-8cd4-4b23320910d5' \
//   -F 'referrer=http://localhost:3000/verification'
