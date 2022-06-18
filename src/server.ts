import express, {Response, Request} from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

// My new Endpoint
app.get("/filteredimage",async (req:Request, res: Response) => {
  // checking the url to find if it exist
 try{

  const image_url = req.query.image_url;

  // validating and checking errors
  if ( !image_url){
    return res.status(400).send("URL needed!");
    
  }

  const filteredpath =  await filterImageFromURL(image_url)
    res.sendFile(filteredpath, (err: Error, data: any) =>{
      deleteLocalFiles(new Array(filteredpath));

      // checking error on endpoint
      if (err){
        res.status(500).send("Error whilst sending the file");
      }
    }) 
    
 } catch (error){
    res.status(500).send("Error message!");
 }
  
});


  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();