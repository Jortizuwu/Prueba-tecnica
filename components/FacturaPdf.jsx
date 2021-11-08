import React from "react";
import moment from "moment";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer/lib/react-pdf.browser.cjs.js";

// @react-pdf/renderer/lib/react-pdf.browser.cjs.js

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "COP",
});

export const FacturaPdf = ({ invoice }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.titleContainer}>
          <Text style={styles.reportTitle}>Factura</Text>
        </View>
        <View style={styles.invoiceNoContainer}>
          <Text style={styles.label}>Factura No:</Text>
          <Text style={styles.invoiceDate}>1</Text>
        </View>
        <View style={styles.invoiceDateContainer}>
          <Text style={styles.label}>Fecha: </Text>
          <Text>{moment(invoice.date).format("MMMM Do YYYY")}</Text>
        </View>
        <View style={styles.headerContainer}>
          <Text style={styles.billTo}>
            Cliente: {`${invoice.client.name} ${invoice.client.lastName}`}
          </Text>
          <Text>{invoice.client.address}</Text>
          <Text>{invoice.client.nationalId}</Text>
          <Text>{invoice.client.zipCode}</Text>
        </View>

        <View style={styles.tableContainer}>
          <View style={styles.container}>
            <Text style={styles.name}>Nombre paquete</Text>
            <Text style={styles.amount}>Precio</Text>
          </View>
          {invoice.packages.map(({ id, price, name }) => {
            return (
              <View key={id} style={styles.row}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.amount}>{price}</Text>
              </View>
            );
          })}
          <View style={styles.row}>
            <Text style={styles.name}>TOTAL</Text>
            <Text style={styles.amount}>{formatter.format(invoice.total)}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};
const borderColor = "#90e5fc";

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    marginTop: 24,
  },
  reportTitle: {
    color: "#61dafb",
    letterSpacing: 4,
    fontSize: 25,
    textAlign: "center",
    textTransform: "uppercase",
  },
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 60,
    paddingRight: 60,
    lineHeight: 1.5,
    flexDirection: "column",
  },
  invoiceNoContainer: {
    flexDirection: "row",
    marginTop: 36,
    justifyContent: "flex-end",
  },
  invoiceDateContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  invoiceDate: {
    fontSize: 12,
    fontStyle: "bold",
  },
  label: {
    width: 60,
  },
  headerContainer: {
    marginTop: 36,
  },
  billTo: {
    marginTop: 20,
    paddingBottom: 3,
    fontFamily: "Helvetica-Oblique",
  },
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 24,
    borderWidth: 1,
    borderColor: "#bff0fd",
  },
  container: {
    flexDirection: "row",
    borderBottomColor: "#bff0fd",
    backgroundColor: "#bff0fd",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    textAlign: "center",
    fontStyle: "bold",
    flexGrow: 1,
  },
  name: {
    width: "80%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  amount: {
    width: "20%",
  },
  row: {
    flexDirection: "row",
    borderBottomColor: "#bff0fd",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    fontStyle: "bold",
  },
  name: {
    width: "80%",
    textAlign: "left",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    paddingLeft: 8,
  },
  amount: {
    width: "20%",
    textAlign: "right",
    paddingRight: 8,
  },
});
