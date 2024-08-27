import React from "react"



import { Typography, Button } from "@mui/material"

import { DataGrid } from '@mui/x-data-grid';


export default class PostsDatabase extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            post: null,
        };
        
    }

    componentDidMount() {
        
       
    }

    componentWillUnmount() {
      }

    render() {

        const Columns = [
  
            { 
            field: 'item', 
            headerName: <Typography variant="h6" style={{color: "#49BC88"}}> Item </Typography>, 
            flex: 2,
            minWidth: 50, 
            renderCell: (params) => (
                  
                <Button
                variant="contained"
                size="small"
                style={{ padding: 5,  borderRadius: 5}}
                href={"/products/" + params.row.collection.replace(/ /g, "_") + "/" + params.row.item.replace(/ /g, "_")}
              >
                <Typography variant="subtitle2" style={{color: "#011000"}}> {params.row.item}  </Typography>
                
                </Button>
            ),
            },
            { 
                field: 'collection', 
                headerName: <Typography variant="h6" style={{color: "#49BC88"}}> Collection </Typography>, 
                type: "date",
                flex: 2,
                minWidth: 50, 
                renderCell: (params) => (
                      
                  <Typography style={{color: "#49BC88"}}> {params.row.collection} </Typography>
                ),
            },
            
          ]

          if(this.props.user) {
            if(this.props.user.email == "abergquist96@gmail.com") {
                Columns.push(
                
                {
                headerName: <Typography variant="h6" style={{color: "#49BC88"}}> Edit </Typography>, 
                type: "date",
                flex: 1,
                minWidth: 20, 
                renderCell: (params) => (
                      
                    <Button
                    variant="contained"
                    size="small"
                    style={{ paddingLeft: 0, borderBottom: "1px solid #49BC88", borderRadius: 5}}
                    onClick={() =>this.props.editWorks(params.row.id)}
                  >
                    <Typography variant="subtitle2" style={{color: "#011000"}}> Edit </Typography>
                    
                    </Button>
                ),
                },
                )
            }
          }

        return (
            <>
                <DataGrid
                    autoHeight
                    pageSize={10}
                    rows={this.props.works} 
                    columns={Columns} 
                    sx={{
                      '& div >.MuiDataGrid-footerContainer': {
                        border: 'none',
                      },
                      '&>.MuiDataGrid-main': {
                        '&>.MuiDataGrid-columnHeaders': {
                          border: 'none',
                        },
                        
                        '& div div div div >.MuiDataGrid-cell': {
                          border: 'none',
                        },
                      },
                        
                        "& .MuiDataGrid-row": {
                          border: "none",
                          borderRadius: "0px",
                          backgroundColor: "#011000",
                        },
                        '& .MuiButtonBase-root': {
                            color: '#49BC88',
                        },
                        '&.MuiDataGrid-root': {
                          border: 'none',
                        },
                        '& .MuiTablePagination-displayedRows': {
                          color: '#49BC88',
                        },
                        '& .MuiDataGrid-columnSeparator': {
                          display: 'none',
                        },
                        
                        
                        
                      }}
                />

             
                
            </>
            
        )
    }
}