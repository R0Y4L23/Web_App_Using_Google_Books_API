$(document).ready(function(){
    $(".search-form").submit(function(e){
        e.preventDefault();
        console.log("search");
        var text=$(".i-search").val();
        getBooks(text);
    });
});
function getBooks(text)
{
   if(text=="")
   {
       $(".root").html("No Search Results.Please Enter valid text.");
   }
   else
   {
       axios.get("https://www.googleapis.com/books/v1/volumes?q="+text).then(function(response){
           console.log(response);
           var books=response.data.items;
           var output='';
           for(var i=0;i<books.length;i++)
            {
              output += '<div class="results"><h2>TITLE : '+books[i].volumeInfo.title+'</h2><h3>AUTHOR : '+books[i].volumeInfo.authors+'</h3><p>DESCRIPTION : '+books[i].volumeInfo.description+'</p><img src="'+books[i].volumeInfo.imageLinks.thumbnail+'"><h5>DATE : '+books[i].volumeInfo.publishedDate+'</h5></div>';
            }
           $(".root").html(output);
           $(".root").css("visibility","visible");
       }).catch(function(err){console.group(err);});
   }
}