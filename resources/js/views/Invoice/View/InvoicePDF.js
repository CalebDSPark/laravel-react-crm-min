/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet
} from '@react-pdf/renderer';

const COL1_WIDTH = 60;
const COLN_WIDTH = (100 - COL1_WIDTH) / 2;

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fff',
    padding: 24
  },
  h1: {
    fontSize: 24,
    fontWeight: 500
  },
  h5: {
    fontSize: 12,
    fontWeight: 500
  },
  h6: {
    fontSize: 10,
    fontWeight: 500
  },
  body1: {
    fontSize: 9,
    lineHeight: 1.5
  },
  body2: {
    fontSize: 8,
    lineHeight: 1.5
  },
  mb1: {
    marginBottom: 4
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  brand: {
    height: 25,
    width: 35
  },
  company: {
    marginTop: 32,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  references: {
    marginTop: 32,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  billing: {
    marginTop: 32
  },
  items: {
    marginTop: 32
  },
  notes: {
    marginTop: 32
  },
  table: {
    display: 'table',
    width: 'auto'
  },
  tableHeader: {},
  tableBody: {},
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#eeeeee',
    borderStyle: 'solid'
  },
  tableCell1: {
    padding: 6,
    width: `${COL1_WIDTH}%`
  },
  tableCellN: {
    padding: 6,
    width: `${COLN_WIDTH}%`
  },
  alignRight: {
    textAlign: 'right'
  }
});

function InvoicePDF({ invoice }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>          
          <View>
            <Image source="/static/logo.png" style={styles.brand} />             
            <Text style={styles.h5}>
              www.calebpark.com
            </Text>
          </View>
          <View>            
            <Text style={styles.h5}>
              Invoice # 1212333
            </Text>
          </View>
        </View>
        <View style={styles.company}>
          <View>
            <Text style={styles.body1}>
            555 Buard St
            </Text>
            <Text style={styles.body1}>
            Vancouver, BC, Canada
            </Text>
            <Text style={styles.body1}>
            V37 4G9
            </Text>
          </View>
          <View>
            <Text style={styles.body1}>
            Company No 11112-347477
            </Text>            
          </View>
          <View>
            <Text style={styles.body1}>
              Email: accounts@calebpark.com
            </Text>
            <Text style={styles.body1}>
              Tel: (+1) 604 455 1457
            </Text>
          </View>
        </View>
        <View style={styles.references}>
          <View>
            <Text style={[styles.h5, styles.mb1]}>
              Due Date
            </Text>
            <Text style={styles.body1}>
              {moment('2020-08-30').format('DD MMM YYYY')}
            </Text>
          </View>
          <View>
            <Text style={[styles.h5, styles.mb1]}>
              Date of issue
            </Text>
            <Text style={styles.body1}>
              {moment('2020-08-01').format('DD MMM YYYY')}
            </Text>
          </View>
          <View>
            <Text style={[styles.h5, styles.mb1]}>
              Reference
            </Text>
            <Text style={styles.body1}>
            11212-454545
            </Text>
          </View>
        </View>
        <View style={styles.billing}>
          <Text style={[styles.h5, styles.mb1]}>
            Billed to
          </Text>
          <Text style={styles.body1}>
          amsung
          </Text>
          <Text style={styles.body1}>
            123 Blue mountain, Vancouver
          </Text>
          <Text style={styles.body1}>
          BC, Canada
          </Text>          
        </View>
        <View style={styles.items}>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <View style={styles.tableRow}>
                <View style={styles.tableCell1}>
                  <Text style={styles.h6}>
                    Description
                  </Text>
                </View>
                <View style={styles.tableCellN} />
                <View style={styles.tableCellN}>
                  <Text style={[styles.h6, styles.alignRight]}>
                    Price
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.tableBody}>
            
              <View style={styles.tableRow}>
                <View style={styles.tableCell1} />
                <View style={styles.tableCellN}>
                  <Text style={styles.body2}>
                    Subtotal
                  </Text>
                </View>
                <View style={styles.tableCellN}>
                  <Text style={[styles.body2, styles.alignRight]}>
                    $100.00
                  </Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableCell1} />
                <View style={styles.tableCellN}>
                  <Text style={styles.body2}>
                    GST
                  </Text>
                </View>
                <View style={styles.tableCellN}>
                  <Text style={[styles.body2, styles.alignRight]}>
                    $5.00
                  </Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableCell1} />
                <View style={styles.tableCellN}>
                  <Text style={styles.body2}>
                    PST
                  </Text>
                </View>
                <View style={styles.tableCellN}>
                  <Text style={[styles.body2, styles.alignRight]}>
                    $7.00
                  </Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableCell1} />
                <View style={styles.tableCellN}>
                  <Text style={styles.body2}>
                    Total
                  </Text>
                </View>
                <View style={styles.tableCellN}>
                  <Text style={[styles.body2, styles.alignRight]}>
                   $112.00
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.notes}>
          <Text style={[styles.h5, styles.mb1]}>
            Notes
          </Text>
          <Text style={styles.body1}>
            Thank you for your business.
          </Text>
        </View>
      </Page>
    </Document>
  );
}

InvoicePDF.propTypes = {
  invoice: PropTypes.object.isRequired
};

export default InvoicePDF;
