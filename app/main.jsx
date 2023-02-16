import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  Grid,
  GridColumn as Column,
  GridToolbar,
} from '@progress/kendo-react-grid';
import { GridPDFExport } from '@progress/kendo-react-pdf';
import { products } from './products';
const App = () => {
  let gridPDFExport;
  let pageSize = 5;
  const [page, setPage] = React.useState({
    skip: 0,
    take: pageSize,
  });
  const [values, setValues] = React.useState([]);
  let total = values.length;
  const fillArray = (n = 10) => {
    var result = [];
    for (var i = 0; i < n; i++) {
      result.push({
        ProductID: i,
        ProductName: 'Chai',
        SupplierID: 1,
        CategoryID: 1,
        QuantityPerUnit: '10 boxes x 20 bags',
        UnitPrice: 18.0,
        UnitsInStock: 39,
        UnitsOnOrder: 0,
        ReorderLevel: 10,
        Discontinued: false,
        Category: {
          CategoryID: i,
          CategoryName: 'Beverages',
          Description: 'Soft drinks, coffees, teas, beers, and ales',
        },
      });
    }
    return result;
  };
  React.useEffect(() => {
    (async () => {
      setValues(fillArray(1500));
    })();
  }, []);
  const pageChange = (event) => {
    setPage(event.page);
  };
  const exportPDF = () => {
    // Simulate a response from a web request.
    setTimeout(() => {
      if (gridPDFExport) {
        gridPDFExport.save(values);
      }
    }, 250);
  };
  const grid = (
    <Grid
      data={values.slice(page.skip, page.skip + page.take)}
      pageable={true}
      onPageChange={pageChange}
      pageSize={pageSize}
      total={total}
      {...page}
    >
      <GridToolbar>
        <button
          title="Export PDF"
          className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
          onClick={exportPDF}
        >
          Export PDF
        </button>
      </GridToolbar>
      <Column field="ProductID" title="ID" width="50px" />
      <Column field="ProductName" title="Name" width="300px" />
      <Column field="Category.CategoryName" title="Category" />
      <Column field="UnitPrice" title="Price" />
      <Column field="UnitsInStock" title="In stock" />
      <Column field="Discontinued" title="Discontinued" />
    </Grid>
  );
  return (
    <div>
      {grid}
      <GridPDFExport
        ref={(pdfExport) => (gridPDFExport = pdfExport)}
        margin="1cm"
      >
        {grid}
      </GridPDFExport>
    </div>
  );
};
ReactDOM.render(<App />, document.querySelector('my-app'));
