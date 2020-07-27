import Engine from '@chartshq/datamodel';

// As the DataModel are asynchronous, so we need to
// use async-await syntax.
async function myAsyncFn() {
  // Fetch sample data and its schema.
  const data = await fetch("/data/cars.json").then(resp => resp.json());
  const schema = await fetch("/data/cars-schema.json").then(resp => resp.json());

  // Load the DataModel module.
  const DataModel = await Engine.onReady();

  // Converts the raw data into a format
  // which DataModel can consume.
  const formattedData = await DataModel.loadData(data, schema);

  // Create a new DataModel instance with
  // the formatted data.
  const dm = new DataModel(formattedData);

  console.log(dm.getData().data);

  // Perform the selection operation.
  const selectDm = dm.select({ field: 'Origin', value: 'USA', operator: DataModel.ComparisonOperators.EQUAL });
  console.log(selectDm.getData().data);

  // Perform the projection operation.
  const projectDm = dm.project(["Origin", "Maker"]);
  console.log(projectDm.getData().data);
}

myAsyncFn()
  .catch(console.error.bind(console));
