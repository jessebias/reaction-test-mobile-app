import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Intro from '../components/Intro';
import Leaderboard from '../components/Leaderboard';
import SettingsModal from '../components/SettingsModal';

const DARK_BG = '#000000';
const DEEP_BG = '#101012';
const SOLANA_GREEN = '#14F195';
const SOLANA_PURPLE = '#9945FF';

export default function GameSelection() {
    const router = useRouter();
    const [showIntro, setShowIntro] = useState(true);
    const [showLeaderboard, setShowLeaderboard] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <LinearGradient
                colors={[DEEP_BG, DARK_BG]}
                style={styles.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <SafeAreaView style={styles.safeArea}>
                    {/* Header Container */}
                    <View style={styles.header}>
                        <TouchableOpacity
                            style={styles.iconButton}
                            onPress={() => setShowLeaderboard(true)}
                        >
                            <Ionicons name="trophy-outline" size={24} color="rgba(255,255,255,0.8)" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.iconButton}
                            onPress={() => setShowSettings(true)}
                        >
                            <Ionicons name="settings-outline" size={24} color="rgba(255,255,255,0.8)" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.headerContent}>
                        <Text style={styles.title}>SOLTAP</Text>
                        <Text style={styles.subtitle}>TRAIN TO EARN</Text>
                    </View>

                    <ScrollView
                        contentContainerStyle={styles.scrollContent}
                        showsVerticalScrollIndicator={false}
                    >
                        {/* Reaction Test Card */}
                        <TouchableOpacity
                            style={styles.card}
                            onPress={() => router.push('/game/reaction')}
                            activeOpacity={0.8}
                        >
                            <LinearGradient
                                colors={['rgba(20, 241, 149, 0.15)', 'rgba(20, 241, 149, 0.05)']}
                                style={styles.cardGradient}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                            >
                                <View style={styles.cardHeader}>
                                    <Text style={[styles.cardIcon, { color: SOLANA_GREEN }]}>⚡️</Text>
                                    <View>
                                        <Text style={[styles.cardTitle, { color: SOLANA_GREEN }]}>REACTION TEST</Text>
                                        <Text style={styles.cardDesc}>Single tap reflex challenge</Text>
                                    </View>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>

                        {/* Multi-Zone Card */}
                        <TouchableOpacity
                            style={styles.card}
                            onPress={() => router.push('/game/multi-zone')}
                            activeOpacity={0.8}
                        >
                            <LinearGradient
                                colors={['rgba(153, 69, 255, 0.15)', 'rgba(153, 69, 255, 0.05)']}
                                style={styles.cardGradient}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                            >
                                <View style={styles.cardHeader}>
                                    <Text style={[styles.cardIcon, { color: SOLANA_PURPLE }]}>💠</Text>
                                    <View>
                                        <Text style={[styles.cardTitle, { color: SOLANA_PURPLE }]}>MULTI-ZONE</Text>
                                        <Text style={styles.cardDesc}>Grid reflex challenge</Text>
                                    </View>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>

                        {/* Speed Run Card */}
                        <TouchableOpacity
                            style={styles.card}
                            onPress={() => router.push('/game/speed-run')}
                            activeOpacity={0.8}
                        >
                            <LinearGradient
                                colors={['rgba(255, 149, 0, 0.15)', 'rgba(255, 149, 0, 0.05)']}
                                style={styles.cardGradient}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                            >
                                <View style={styles.cardHeader}>
                                    <Text style={[styles.cardIcon, { color: '#FF9500' }]}>🔥</Text>
                                    <View>
                                        <Text style={[styles.cardTitle, { color: '#FF9500' }]}>SPEED RUN</Text>
                                        <Text style={styles.cardDesc}>Endurance streak challenge</Text>
                                    </View>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                    </ScrollView>
                </SafeAreaView>

                {/* Branding Footer */}
                <View style={styles.brandingContainer}>
                    <LinearGradient
                        colors={[SOLANA_PURPLE, SOLANA_GREEN]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.brandingBar}
                    />
                </View>
            </LinearGradient>

            {showIntro && <Intro onFinish={() => setShowIntro(false)} />}

            <Leaderboard
                visible={showLeaderboard}
                onClose={() => setShowLeaderboard(false)}
                gameMode="reaction_test"
            />

            <SettingsModal
                visible={showSettings}
                onClose={() => setShowSettings(false)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: DARK_BG,
    },
    gradient: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingTop: 10,
        zIndex: 10,
    },
    iconButton: {
        padding: 8,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 20,
    },
    headerContent: {
        marginTop: 20,
        marginBottom: 40,
        alignItems: 'center',
    },
    scrollContent: {
        paddingBottom: 100,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 42,
        fontWeight: '900',
        color: 'white',
        textAlign: 'center',
        letterSpacing: 2,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: '#888',
        textAlign: 'center',
        letterSpacing: 4,
        marginBottom: 20,
        textTransform: 'uppercase',
    },
    card: {
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        marginBottom: 20,
    },
    cardGradient: {
        padding: 24,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    cardIcon: {
        fontSize: 32,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '900',
        letterSpacing: 1,
        marginBottom: 4,
    },
    cardDesc: {
        color: '#AAA',
        fontSize: 14,
        fontWeight: '500',
    },
    brandingContainer: {
        position: 'absolute',
        bottom: 50,
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 5,
    },
    brandingBar: {
        width: 60,
        height: 4,
        borderRadius: 2,
    },
});
