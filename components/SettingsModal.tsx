import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
    Alert,
    Linking,
    Modal,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface SettingsModalProps {
    visible: boolean;
    onClose: () => void;
}

const DARK_BG = '#000000';
const DEEP_BG = '#101012';
const TEXT_COLOR = '#FFFFFF';
const BORDER_COLOR = 'rgba(255, 255, 255, 0.1)';

export default function SettingsModal({ visible, onClose }: SettingsModalProps) {
    const handleContact = () => {
        const email = 'support@soltap.app'; // Placeholder
        const subject = 'SolTap Support';
        const url = `mailto:${email}?subject=${subject}`;

        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                Alert.alert('Contact', `Please email us at ${email}`);
            }
        });
    };

    const handleLink = (title: string) => {
        Alert.alert(title, 'This document is not yet available.');
    };

    const renderItem = (icon: keyof typeof Ionicons.glyphMap, title: string, onPress: () => void) => (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View style={styles.itemLeft}>
                <Ionicons name={icon} size={22} color={TEXT_COLOR} style={styles.itemIcon} />
                <Text style={styles.itemTitle}>{title}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>
    );

    return (
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="pageSheet"
            onRequestClose={onClose}
        >
            <View style={styles.container}>
                <StatusBar style="light" />
                <SafeAreaView style={styles.safeArea}>
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={onClose} style={styles.backButton}>
                            <Ionicons name="chevron-back" size={28} color={TEXT_COLOR} />
                            <Text style={styles.backText}>Back</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.content}>
                        <Text style={styles.title}>Settings</Text>

                        <View style={styles.section}>
                            {renderItem('mail-outline', 'Contact us', handleContact)}
                            {renderItem('shield-checkmark-outline', 'Privacy Policy', () => handleLink('Privacy Policy'))}
                            {renderItem('document-text-outline', 'Terms of Use', () => handleLink('Terms of Use'))}
                        </View>

                        <View style={styles.footer}>
                            <Text style={styles.version}>Version 1.0.0</Text>
                        </View>
                    </View>
                </SafeAreaView>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: DEEP_BG,
    },
    safeArea: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 16,
        paddingTop: Platform.OS === 'android' ? 40 : 10,
        paddingBottom: 20,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backText: {
        color: TEXT_COLOR,
        fontSize: 17,
        marginLeft: -4, // Tighten up the chevron spacing
    },
    content: {
        paddingHorizontal: 24,
    },
    title: {
        fontSize: 34,
        fontWeight: 'bold',
        color: TEXT_COLOR,
        marginBottom: 32,
    },
    section: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: BORDER_COLOR,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 18,
        borderBottomWidth: 1,
        borderColor: BORDER_COLOR,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    itemIcon: {
        width: 24,
        textAlign: 'center',
    },
    itemTitle: {
        fontSize: 17,
        color: TEXT_COLOR,
        fontWeight: '500',
    },
    footer: {
        marginTop: 40,
        alignItems: 'center',
    },
    version: {
        color: '#666',
        fontSize: 13,
    }
});
