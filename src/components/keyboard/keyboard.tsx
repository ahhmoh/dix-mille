import { useTheme } from '@/hooks/use-theme';
import { AntDesign, Entypo, FontAwesome6, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ButtonWithIcon } from '../btn-with-icon';
import { ButtonScore } from '../score-buttons/button-score';

const theme = useTheme();

type KeyboardProps = {
  onBtnScorePressed: (toDisplay: number) => void;
  onBtnAddPressed: () => void;
  onBtnEqualPressed: () => void;
  onBtnRollbackPressed: () => void;
  onBtnErasePressed: () => void;
  onBtnFailedPressed: () => void;
  onBtnValidatePressed: (toSave: number) => void;
};

export function Keyboard({
  onBtnScorePressed,
  onBtnAddPressed,
  onBtnEqualPressed,
  onBtnRollbackPressed,
  onBtnErasePressed,
  onBtnFailedPressed,
  onBtnValidatePressed,
}: KeyboardProps) {
  return (
    <View style={styles.btnZone}>
      <View style={styles.btnCol}>
        <ButtonScore
          value={7}
          onPressCommand={onBtnScorePressed}
          style={styles.btn}
        />
        <ButtonScore
          value={4}
          onPressCommand={onBtnScorePressed}
          style={styles.btn}
        />
        <ButtonScore
          value={1}
          onPressCommand={onBtnScorePressed}
          style={styles.btn}
        />
        <ButtonScore
          value={0}
          onPressCommand={onBtnScorePressed}
          style={styles.btn}
        />
      </View>

      <View style={styles.btnCol}>
        <ButtonScore
          value={8}
          onPressCommand={onBtnScorePressed}
          style={styles.btn}
        />
        <ButtonScore
          value={5}
          onPressCommand={onBtnScorePressed}
          style={styles.btn}
        />
        <ButtonScore
          value={2}
          onPressCommand={onBtnScorePressed}
          style={styles.btn}
        />
        <ButtonWithIcon
          onPressCommand={onBtnAddPressed}
          style={styles.btn}
        >
          <AntDesign
            name='plus'
            size={40}
            color={theme.primary}
          />
        </ButtonWithIcon>
      </View>

      <View style={styles.btnCol}>
        <ButtonScore
          value={9}
          onPressCommand={onBtnScorePressed}
          style={styles.btn}
        />
        <ButtonScore
          value={6}
          onPressCommand={onBtnScorePressed}
          style={styles.btn}
        />
        <ButtonScore
          value={3}
          onPressCommand={onBtnScorePressed}
          style={styles.btn}
        />

        <ButtonWithIcon
          onPressCommand={onBtnEqualPressed}
          style={styles.btn}
        >
          <FontAwesome6
            name='equals'
            size={40}
            color={theme.primary}
          />
        </ButtonWithIcon>
      </View>
      <View style={styles.btnCol}>
        <ButtonWithIcon
          onPressCommand={onBtnRollbackPressed}
          style={[styles.btn]}
        >
          <Ionicons
            name='arrow-undo'
            size={40}
            color={theme.primary}
          />
        </ButtonWithIcon>
        <ButtonWithIcon
          onPressCommand={onBtnErasePressed}
          style={styles.btn}
        >
          <FontAwesome6
            name='eraser'
            size={40}
            color={theme.primary}
          />
        </ButtonWithIcon>
        <ButtonWithIcon
          onPressCommand={onBtnFailedPressed}
          style={[styles.btn, { backgroundColor: '#fab2a5' }]}
          stylePressed={{ backgroundColor: '#f87d67' }}
        >
          <Entypo
            name='cross'
            size={50}
            color={theme.primary}
          />
        </ButtonWithIcon>
        <ButtonWithIcon
          onPressCommand={onBtnValidatePressed}
          style={[styles.btn, { backgroundColor: '#C1E1C1' }]}
          stylePressed={{ backgroundColor: '#7fe27f' }}
        >
          <Ionicons
            name='checkmark-sharp'
            size={50}
            color={theme.primary}
          />
        </ButtonWithIcon>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btnZone: {
    flex: 1,
    flexDirection: 'row',
    paddingRight: 76,
    paddingLeft: 76,
    gap: 2,
  },
  btnCol: {
    flex: 1,
    gap: 2,
  },
  btn: {
    flex: 1,
  },
});
