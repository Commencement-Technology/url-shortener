import React from "react";
import {
  Container,
  Box,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import {
  fetchShortUrls,
  createShortUrl,
  fetchFullUrl,
} from "../services/shortUrlService";

const Home = () => {
  const [shortUrls, setShortUrls] = React.useState([]);
  const [fullUrl, setFullUrl] = React.useState("");

  React.useEffect(() => {
    fetchShortUrls()
      .then((data) => setShortUrls(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    createShortUrl(fullUrl)
      .then((data) => {
        setShortUrls((prevShortUrls) => [data, ...prevShortUrls]);
        setFullUrl("");
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleShortUrlClick = (shortUrl) => {
    fetchFullUrl(shortUrl)
      .then((data) => {
        window.open(data.fullUrl, "_blank");
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <>
      <Container>
        <form onSubmit={handleSubmit}>
          <Box display="flex" alignItems="center">
            <TextField
              required
              placeholder="Enter the full url here"
              type="url"
              name="fullUrl"
              id="fullUrl"
              variant="outlined"
              fullWidth
              value={fullUrl}
              onChange={(e) => setFullUrl(e.target.value)}
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{ marginLeft: "10px", marginTop: "8px", height: "56px" }}
            >
              Shorten
            </Button>
          </Box>
        </form>

        <TableContainer component={Paper} style={{ marginTop: "20px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Full URL</TableCell>
                <TableCell>Short URL</TableCell>
                <TableCell>Clicks</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {shortUrls.map((shortUrl) => (
                <TableRow key={shortUrl._id}>
                  <TableCell>
                    <a
                      href={shortUrl.full}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {shortUrl.full}
                    </a>
                  </TableCell>
                  <TableCell>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleShortUrlClick(shortUrl.short);
                      }}
                    >
                      {shortUrl.short}
                    </a>
                  </TableCell>
                  <TableCell>{shortUrl.clicks}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Home;
