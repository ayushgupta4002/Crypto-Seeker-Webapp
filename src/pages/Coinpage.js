import React from 'react'
import { SingleCoin } from '../config/api'
import { CryptoState } from '../Cryptocontext'
import { LinearProgress, makeStyles, TableRow, Typography } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",

    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  sidebar: {
    width: "50%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid grey",
  },
  heading: {
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Montserrat",
  },
  rightbar: {
    width: "50%",
    fontWeight: "bold",
    margin: 20,
    padding: 20,
    fontFamily: "Montserrat",
    textAlign: "justify",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      
    },
    [theme.breakpoints.down("xs")]: {
      alignItems: "start",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  description: {
    width: "100%",
    fontFamily: "Montserrat",
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: "justify",
  },
  marketData: {
    alignSelf: "start",
    padding: 25,
    paddingTop: 10,
    width: "100%",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      justifyContent: "space-around",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
    [theme.breakpoints.down("xs")]: {
      alignItems: "start",
    },
  },
}));
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const Coinpage = () => {

  const classes = useStyles();
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    console.log(data);
    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
<div>
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img
          src={coin.image.large}
          alt={coin.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" className={classes.heading}>
          {coin.name}
        </Typography>

        <Typography variant="subtitle1" className={classes.description}>
          {ReactHtmlParser(coin.description.en.split(". ")[0])}.
        </Typography>

        <div className={classes.marketData}>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {numberWithCommas(coin.market_cap_rank)}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
        </div>

      </div>
      <div className={classes.rightbar}><Typography variant="h3"
        style={{
          fontFamily: "Montserrat",
          fontWeight: "bold",
         
        }}
      >Some More Details:</Typography>
        &nbsp;  &nbsp;&nbsp; &nbsp;
        <Typography variant="h5" >  </Typography>
        &nbsp;  &nbsp;
        <Typography variant="h5" >  </Typography>
        &nbsp;  &nbsp;

        <Typography variant="h5" >
          Total Volume : {numberWithCommas(coin.market_data.total_volume[currency.toLowerCase()])}</Typography>
        &nbsp;  &nbsp;&nbsp; &nbsp;
        
        <Typography variant="h5" >  </Typography>
        &nbsp;  &nbsp;

        <Typography variant="h5" >
          Website : {coin.links.homepage[0]} 
        </Typography>
        &nbsp;  &nbsp;&nbsp; &nbsp;

        <Typography variant="h5" >  </Typography>
        &nbsp;  &nbsp;

        <Typography variant="h5" >
         Rank :  {numberWithCommas(coin.market_cap_rank)}
        </Typography>
        
        &nbsp;  &nbsp;&nbsp; &nbsp;
        <Typography variant="h5" >  </Typography>
        &nbsp;  &nbsp;
      
       

        <Typography variant="h5" >Liquidity Score : {coin.liquidity_score}
        </Typography>
        
        &nbsp;  &nbsp;&nbsp; &nbsp;
        
        
        <Typography variant="h5" >  </Typography>
        
        &nbsp;  &nbsp;
  

        <Typography variant="h5" style={{
                      color:  "rgb(14, 203, 129)" ,
                      
                    }} >

        price change percentage (1year) : {coin.market_data.price_change_percentage_1y}%
        </Typography>

        

        </div>
       




    </div>
    <Typography  style={{
                      marginBottom: 0,
                      alignItems: "center",
                    }} >

Made by <a href="https://novus-ayush.herokuapp.com/">Ayush Gupta</a> for the Community
        </Typography>

    </div>
  )
}

export default Coinpage