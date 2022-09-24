import AddIcon from "@mui/icons-material/Add";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import React from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import axios from "./axios";
import { v4 as uuid } from "uuid";
import { useTheme } from "@emotion/react";

function Form({ setFormData, setShowDownload }) {
  const product = { type: "", quantity: "", rate: "", total: "", key: "one" };
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      // number: "",
      type: "QUOTATION",
      client: "",
      street: "",
      city: "",
      pin: "",
      contact: "",
      products: [product],
    },
  });
  // useEffect(() => {
  //   isDirty && setShowDownload(false);
  // }, [isDirty, isValid]);

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: "products", // unique name for your Field Array
    }
  );
  const onSubmit = async (data) => {
    const resp = await axios("/invoice", {
      method: "POST",
      responseType: "blob",
      data: { data },
    }).catch(console.log);
    var binaryData = [];
    binaryData.push(resp.data);
    const fileURL = window.URL.createObjectURL(
      new Blob(binaryData, { type: "application/pdf" })
    );
    // window.open(fileURL);
    // const fileURL = window.URL.createObjectURL(resp.data);
    // Setting various property values
    let alink = document.createElement("a");
    alink.href = fileURL;
    alink.download = `${data.client}.pdf`;
    alink.click();
  };
  return (
    <Box
      component="form"
      sx={{ px: "6px", "& .MuiTextField-root": { mt: 1, width: "100%" } }}
      noValidate
      autoComplete="off"
    >
      <div>
        {/* <Controller
          name="number"
          control={control}
          rules={{ required: true }}
          render={({
            field,
            fieldState: { invalid, isTouched, isDirty, error },
          }) => {
            return (
              <TextField
                required
                id="outlined-required"
                error={error}
                label="Number"
                {...field}
              />
            );
          }}
        /> */}
        <Grid
          container
          spacing={1}
          sx={{
            marginLeft: 0,
            marginTop: 0,
          }}
        >
          <Grid xs={6} sx={{ pr: 1 }}>
            <Controller
              name="type"
              control={control}
              rules={{ required: true }}
              render={({
                field,
                fieldState: { invalid, isTouched, isDirty, error },
              }) => {
                return (
                  <Select
                    fullWidth
                    sx={{ widh: "100%", mt: 1 }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={watch("type")}
                    label="Age"
                    {...field}
                  >
                    <MenuItem value="QUOTATION">QUOTATION</MenuItem>
                    <MenuItem value="CASH BILL">CASH BILL</MenuItem>
                  </Select>
                );
              }}
            />
          </Grid>
          <Grid xs={6} sx={{ pr: 1 }}>
            <Controller
              name="date"
              control={control}
              rules={{ required: true }}
              render={({
                field,
                fieldState: { invalid, isTouched, isDirty, error },
              }) => {
                return (
                  <TextField
                    placeholder=""
                    type="date"
                    required
                    id="outlined-required"
                    error={error}
                    label=""
                    {...field}
                  />
                );
              }}
            />
          </Grid>
        </Grid>

        <Controller
          name="client"
          control={control}
          rules={{ required: true }}
          render={({
            field,
            fieldState: { invalid, isTouched, isDirty, error },
          }) => {
            return (
              <TextField
                required
                id="outlined-required"
                error={error}
                label="Client"
                {...field}
              />
            );
          }}
        />
        <Controller
          name="street"
          control={control}
          rules={{ required: true }}
          render={({
            field,
            fieldState: { invalid, isTouched, isDirty, error },
          }) => (
            <TextField
              error={error}
              required
              id="outlined-required"
              label="Street"
              {...field}
            />
          )}
        />
        <Controller
          name="city"
          control={control}
          rules={{ required: true }}
          render={({
            field,
            fieldState: { invalid, isTouched, isDirty, error },
          }) => (
            <TextField
              error={error}
              required
              id="outlined-required"
              label="City"
              {...field}
            />
          )}
        />
        <Controller
          name="pin"
          control={control}
          rules={{ required: true }}
          render={({
            field,
            fieldState: { invalid, isTouched, isDirty, error },
          }) => (
            <TextField
              error={error}
              required
              type="number"
              id="outlined-required"
              label="Pin"
              {...field}
            />
          )}
        />
        <Controller
          name="contact"
          control={control}
          rules={{ required: true }}
          render={({
            field,
            fieldState: { invalid, isTouched, isDirty, error },
          }) => (
            <TextField
              error={error}
              type="number"
              required
              id="outlined-required"
              label="Contact"
              {...field}
            />
          )}
        />
      </div>
      <Box sx={{ mt: 1, ml: 1 }}>Products</Box>
      {fields.map((product, index) => {
        return (
          <React.Fragment key={product.key}>
            <Box
              onClick={(e) => {
                if (fields.length === 1) return;
                remove(index);
              }}
              sx={{
                height: "18px",
                width: "18px",
                background: theme.palette.secondary.main,
                position: "absolute",
                right: "8px",
                color: "white",
                borderRadius: "50px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              x
            </Box>
            <Box sx={{ padding: "6px" }}>
              <Grid
                container
                spacing={1}
                sx={{
                  marginLeft: "-4px",
                  paddingRight: "10px",
                  paddingBottom: "10px",
                  paddingTop: "-8px",
                  border: "1px solid",
                  borderColor: "#80808085",
                  marginTop: "3px",
                  borderRadius: "10px",
                }}
              >
                <Grid item xs={8}>
                  <Controller
                    name={"products." + index + ".type"}
                    control={control}
                    rules={{ required: true }}
                    render={({
                      field,
                      fieldState: { invalid, isTouched, isDirty, error },
                    }) => (
                      <TextField
                        error={error}
                        required
                        id="outlined-required"
                        label="Type"
                        {...field}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Controller
                    name={"products." + index + ".quantity"}
                    control={control}
                    rules={{ required: true }}
                    render={({
                      field,
                      fieldState: { invalid, isTouched, isDirty, error },
                    }) => (
                      <TextField
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(value);
                          const rate = watch("products." + index + ".rate");
                          const total = rate * value;
                          !isNaN(total) &&
                            setValue("products." + index + ".total", total);
                        }}
                        type="number"
                        error={error}
                        required
                        id="outlined-required"
                        label="Quantity"
                        //{...field}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name={"products." + index + ".rate"}
                    control={control}
                    rules={{ required: true }}
                    render={({
                      field,
                      fieldState: { invalid, isTouched, isDirty, error },
                    }) => (
                      <TextField
                        type="number"
                        error={error}
                        required
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(value);
                          const quantity = watch(
                            "products." + index + ".quantity"
                          );
                          const total = quantity * value;
                          !isNaN(total) &&
                            setValue("products." + index + ".total", total);
                        }}
                        id="outlined-required"
                        label="Rate"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name={"products." + index + ".total"}
                    control={control}
                    rules={{ required: true }}
                    render={({
                      field,
                      fieldState: { invalid, isTouched, isDirty, error },
                    }) => (
                      <TextField
                        disabled
                        error={error}
                        required
                        id="outlined-required"
                        label="Total"
                        {...field}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Box>
          </React.Fragment>
        );
      })}
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "end" }}>
        <Fab
          size="small"
          color="primary"
          aria-label="add"
          sx={{ mx: 1 }}
          onClick={() => {
            append({ ...product, key: uuid() });
          }}
        >
          <AddIcon />
        </Fab>
        <Button
          sx={{ mt: 1 }}
          variant="outlined"
          onClick={handleSubmit(onSubmit)}
        >
          Save & Download
        </Button>
      </Box>
    </Box>
  );
}

export default Form;
