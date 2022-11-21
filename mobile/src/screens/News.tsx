import axios from 'axios';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import NewsArticle from '../components/NewsArticle';
import TemplateMain from '../templates/TemplateMain';

const News = ({ navigation }) => {
	const [articles, setArticles] = useState<any>({});
	// TODO: Turn this fetch into a reduce that builds the object the proper way instead of breaking out the image and the content
	// TODO: Turn into Provider to fetch once per app session
	useEffect(() => {
		axios
			.get(
				`https://cdn.contentful.com/spaces/${process.env.REACT_APP_CONTENTFUL_SPACE_ID}/environments/master/entries?access_token=${process.env.REACT_APP_CONTENTFUL_CONTENT_DELIVERY_ACCESS_TOKEN}&include=1`,
			)
			.then((res) => {
				setArticles(res.data);
			})
			.catch((err) => console.log);
	}, []);
	return (
		<TemplateMain
			style={styles.News}
			title='News'
			navigation={navigation}
			carousel
		>
			<View>
				{articles?.items?.map((article, index) => {
					return (
						<NewsArticle
							navigation={navigation}
							image={
								articles['includes']?.Asset[index]?.fields?.file
									?.url
							}
							article={article}
							key={index}
						/>
					);
				})}
			</View>
		</TemplateMain>
	);
};

export default News;

const styles = StyleSheet.create({
	News: {
		flex: 1,
	},
});
