import { Alert } from 'react-native';

interface AlertButton {
	text: string;
	onPress: () => void;
	style?: 'cancel' | 'default' | 'destructive';
}

const renderAlert = (title: string, message: string, cancel: string, button?: AlertButton) => {
	return Alert.alert(
		title,
		message,
		[{ text: cancel, style: 'cancel' } as AlertButton, button].filter(Boolean),
	);
};
export default renderAlert;
