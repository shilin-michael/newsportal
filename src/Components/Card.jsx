import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import "./Components.scss";

const useStyles = makeStyles({
});

const Cards = (props) => {
    const classes = useStyles();
  const {
		title,
    abstract,
    thumbnail_standard,
    url
  } = props;
  return (
		<Card className={classes.root} 
			onClick={(e) => {
				e.stopPropagation();
				window.open(url);
			}}>
			<CardActionArea>
				<CardContent>
					<div class="card-wrapper">
						<div className="thumbnail">
							<img src={thumbnail_standard} alt="" />
						</div>
						<div className="newsbody">
							<Typography gutterBottom variant="h5" component="h2">
								{title}
							</Typography>
							<Typography variant="body2" color="textSecondary" component="p">
								{abstract}
							</Typography>
							<Button size="small" color="primary" 	>
								Read More
							</Button>
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<Button size="small" color="primary" 
							onClick={(e) => {
								e.stopPropagation();
								// alert('here')
								let stored = JSON.parse(localStorage.getItem("readlater"));
								console.log('stored ', stored)
								stored = stored ? stored : [];
								stored.push({title, url })
								localStorage.setItem("readlater", JSON.stringify(stored	));
							}}>
								Read Later
							</Button>
						</div>
    				</div>
				</CardContent>
			</CardActionArea>
		</Card>
  );
};

export default Cards;