import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
  Font,
} from "@react-pdf/renderer";
import numToText from "number2text";
import React from "react";
import logo from "./logo.png";
import font from "./Roboto-Bold.ttf";
Font.register({
  family: "Roboto",
  format: "truetype",
  src: font,
});
// Create styles
const styles = StyleSheet.create({
  mainView: {
    width: "100%",
    border: "1px solid black",
  },
  page: {
    boxSizing: "border-box",
    padding: "20px",
    flexDirection: "row",
    backgroundColor: "#ffff",
  },
  section: {
    display: "flex",
    flexDirection: "row",
    width: "100%",

    borderBottom: "1px solid black",
  },
  image: {
    marginTop: "-5px",
    marginLeft: "-5px",
    width: "80px",
    padding: 10,
  },
});

// Create Document Component
const MyDocument = ({ data: fd }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.mainView}>
        <View style={styles.section}>
          <Image src={logo} style={styles.image} />
          <View style={{ color: "#007fdb" }}>
            <Text
              style={{
                marginTop: "5px",
                fontSize: "15px",
                fontFamily: "Roboto",
                fontWeight: "bold",
              }}
            >
              Safety & Safety Enterprises
            </Text>
            <Text style={{ marginTop: "5px", fontSize: "11px" }}>
              No.24, Thirumanajana veethi,
            </Text>
            <Text style={{ marginTop: "5px", fontSize: "11px" }}>Kornad,</Text>
            <Text style={{ marginTop: "5px", fontSize: "11px" }}>
              Mayiladuthurai - 609001
            </Text>
          </View>
          <View>
            <Text
              style={{
                marginTop: "10px",
                fontSize: "11px",
                marginLeft: "190px",
              }}
            >
              Phone:{" "}
              <Text style={{ color: "#312f22", fontSize: "10px" }}>
                8489489666
              </Text>
            </Text>
          </View>
        </View>
        <View style={{ ...styles.section, fontSize: "10px", padding: "4px" }}>
          <View style={{ width: "40%" }}>
            <Text>
              No:
              <Text style={{ color: "#312f22", fontSize: "10px" }}>
                {" " + fd.number}
              </Text>
            </Text>
          </View>
          <View
            style={{
              fontSize: "11px",
              width: "20%",
              borderLeft: "1px soild black",
              borderRight: "1px soild black",
              textAlign: "center",
            }}
          >
            <Text>{fd.type || ""}</Text>
          </View>
          <View style={{ width: "40%", textAlign: "right" }}>
            <Text>
              Date:{" "}
              <Text style={{ color: "#312f22", fontSize: "10px" }}>
                {new Date(fd.date).toLocaleString().slice(0, 10)}
              </Text>
            </Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",

            ...styles.section,
            height: "100px",
            fontSize: "11px",
            padding: "5px",
            flexDirection: "column",
            paddingLeft: "19px",
          }}
        >
          <Text style={{ marginLeft: "-14px" }}>To:</Text>
          <Text style={{ marginTop: "0px" }}>{fd.client},</Text>
          <Text style={{ marginTop: "5px" }}>{fd.street},</Text>
          <Text style={{ marginTop: "5px" }}>{fd.city},</Text>
          <Text style={{ marginTop: "5px" }}>{fd.pin}.</Text>
          <Text style={{ marginTop: "5px" }}>{fd.contact}.</Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            fontSize: "12px",
            width: "100%",
            textAlign: "center",
          }}
        >
          <View
            style={{
              padding: "5px",
              width: "7%",
              borderRight: "1px solid black",
              borderBottom: "1px solid black",
            }}
          >
            <Text>S.No</Text>
          </View>
          <View
            style={{
              padding: "5px",
              width: "48%",
              borderRight: "1px solid black",
              borderBottom: "1px solid black",
            }}
          >
            <Text>Description</Text>
          </View>
          <View
            style={{
              padding: "5px",
              width: "15%",
              borderRight: "1px solid black",
              borderBottom: "1px solid black",
            }}
          >
            <Text>Qty</Text>
          </View>
          <View
            style={{
              padding: "5px",
              width: "15%",
              borderRight: "1px solid black",
              borderBottom: "1px solid black",
            }}
          >
            <Text>Rate</Text>
          </View>
          <View
            style={{
              padding: "5px",
              width: "15%",
              borderBottom: "1px solid black",
            }}
          >
            <Text>Amount</Text>
          </View>
        </View>
        {fd.products &&
          [...fd.products, ...new Array(20 - fd.products.length).fill({})].map(
            (product, index) => (
              <View
                style={{
                  color: "#312f22",
                  display: "flex",
                  flexDirection: "row",
                  fontSize: "10px",
                  width: "100%",
                  textAlign: "center",
                  minHeight: "23px",
                }}
              >
                <View
                  style={{
                    padding: "5px",
                    width: "7%",
                    borderRight: "1px solid black",
                    borderBottom: "1px solid black",
                  }}
                >
                  <Text>{product.total ? index + 1 : ""}</Text>
                </View>
                <View
                  style={{
                    padding: "5px",
                    width: "48%",
                    borderRight: "1px solid black",
                    borderBottom: "1px solid black",
                  }}
                >
                  <Text>{product.type || ""}</Text>
                </View>
                <View
                  style={{
                    padding: "5px",
                    width: "15%",
                    borderRight: "1px solid black",
                    borderBottom: "1px solid black",
                  }}
                >
                  <Text>{product.quantity || ""}</Text>
                </View>
                <View
                  style={{
                    padding: "5px",
                    width: "15%",
                    borderRight: "1px solid black",
                    borderBottom: "1px solid black",
                  }}
                >
                  <Text>{product.rate || ""}</Text>
                </View>
                <View
                  style={{
                    padding: "5px",
                    width: "15%",
                    borderBottom: "1px solid black",
                  }}
                >
                  <Text>{product.total || ""}</Text>
                </View>
              </View>
            )
          )}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            fontSize: "10px",
            width: "100%",
            textAlign: "center",
          }}
        >
          <View
            style={{
              padding: "5px",
              width: "70%",
              borderRight: "1px solid black",
              borderBottom: "1px solid black",
            }}
          >
            <Text></Text>
          </View>
          <View
            style={{
              padding: "5px",
              width: "15%",
              borderRight: "1px solid black",
              borderBottom: "1px solid black",
            }}
          >
            <Text>Grand Total</Text>
          </View>
          <View
            style={{
              padding: "5px",
              width: "15%",
              borderBottom: "1px solid black",
            }}
          >
            <Text>
              {fd.products &&
                fd.products.reduce((acc, item) => acc + item.total || 0, 0)}
            </Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            fontSize: "10px",
            width: "100%",
            textAlign: "left",
            height: "75px",
          }}
        >
          <View
            style={{
              padding: "5px",
              width: "70%",
              borderRight: "1px solid black",
              borderBottom: "1px solid black",
            }}
          >
            <Text>Rupees:</Text>
            <Text style={{ margin: "5px 0 0 35px" }}>
              {numToText(
                fd.products
                  ? fd.products.reduce((acc, item) => acc + item.total || 0, 0)
                  : 0,
                "Indian"
              ) + " only"}
            </Text>
          </View>

          <View
            style={{
              padding: "5px",
              width: "30%",
              borderBottom: "1px solid black",
              textAlign: "left",
            }}
          >
            <Text>For SAFETY & SAFETY</Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);
export default MyDocument;
