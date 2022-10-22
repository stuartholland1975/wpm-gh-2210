import {gql, useMutation, useQuery} from "@apollo/client";
import CreateButton from "../ui-components/buttons/CreateButton";
import CancelButton from "../ui-components/buttons/CancelButton";
import {Grid, MenuItem, TextField} from "@mui/material";
import React from "react";
import {DateTime} from "luxon";
import exifr from 'exifr'
import {gridSelectionsVar} from "../../cache";
import {GET_SINGLE_ORDERHEADER} from '../order-admin/OrderStats';

const dt = DateTime.now().toISO();
const defaultDate = DateTime.now().toISODate();


const UPLOAD_IMAGE = gql`
  mutation CreateImage($input: CreateImageInput!) {
    createImage(input: $input) {
      image {
        orderheaderId
      }
    }
  }
`;

const GET_IMAGE_TYPES = gql`
  query GetImageTypes {
    imageTypes {
      nodes {
        id
        longName
        shortName
      }
    }
  }
`;

const GET_SINGLE_LOCATION = gql`
query GetSingleLocation($id: Int!) {
  sitelocationWithValue(id: $id) {
    complete
    id
    itemCount
    itemsComplete
    orderValue
    orderheaderId
    reference
    valueApplied
    valueComplete
    worksheetReference
    imageCount
  }
}

`

const ImageForm = ({ hideModal }) => {

  const [uploadImage] = useMutation(UPLOAD_IMAGE, {
    refetchQueries: [
      {
        query: GET_SINGLE_LOCATION,
        variables: { id: Number(gridSelectionsVar().selectedLocation.id) },
        fetchPolicy: 'network-only'
      },
      {
        query: GET_SINGLE_ORDERHEADER,
        variables: { id: Number(gridSelectionsVar().selectedOrder.id) },
      },
    ],
    awaitRefetchQueries: true,
    onCompleted: () => hideModal()
  });
  const [itemType, setItemType] = React.useState({});

  const [imageFile, setImageFile] = React.useState()

  const handleChange = (event) => {
    setItemType(event.target.value);
  };

  const { data } = useQuery(GET_IMAGE_TYPES);


  const onSubmit = async (event) => {
    event.preventDefault()
    let fd = new FormData(event.target)
    const dateTakenManual = fd.get("dateTakenManual")
    const exif = await exifr.parse(imageFile)
    const gps = await exifr.gps(imageFile)

    await uploadImage({
      variables: {
        input: {
          image: {
            createdAt: dt,
            dateTakenManual,
            headerImageFile: imageFile,
            imageTypeId: itemType.id,
            sitelocationId: gridSelectionsVar().selectedLocation.id,
            exif: exif,
            exifGps: gps
          },
        },
      },
    })

  };
  return (
    <form onSubmit={onSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Work Done Date"
            type="date"
            name="dateTakenManual"
            required
            variant="filled"
            fullWidth
            InputLabelProps={{ shrink: true }}
            defaultValue={defaultDate}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Select Image File"
            type="file"
            fullWidth
            variant="filled"
            InputLabelProps={{ shrink: true }}
            name="headerImageFile"
            required
            onChange={(event) => (
              event.target.files.length > 0 &&
              setImageFile(event.target.files[0])
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label={"Item Type"}
            select
            InputLabelProps={{ shrink: true }}
            variant={"filled"}
            fullWidth
            value={itemType}
            onChange={handleChange}
          >
            {data &&
              data.imageTypes.nodes.map((item) => (
                <MenuItem key={item.id} value={item}>
                  {item.longName}
                </MenuItem>
              ))}
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <CreateButton type={"submit"} label={"upload image"} />
        </Grid>
        <Grid item xs={6}>
          <CancelButton label={"CLOSE"} type={"button"} onClick={hideModal} fullWidth />
        </Grid>
      </Grid>
    </form>
  );
};

export default ImageForm;
