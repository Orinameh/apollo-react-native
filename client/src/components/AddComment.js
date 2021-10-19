import React, {useCallback, useState} from 'react';
import {
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {useMutation} from '@apollo/client';
import {CREATE_COMMENT, GET_COMMENTS_BY_PRODUCT} from '../graphql/requests';

export function AddComment({productId}) {
  const [comment, setComment] = useState('');
  const [createComment, {}] = useMutation(CREATE_COMMENT, {
    update(cache, {data}) {
      const {comment: addedComment} = data.createComment;
      const {comments} = cache.readQuery({
        query: GET_COMMENTS_BY_PRODUCT,
        variables: {
          productId,
        },
      });
      cache.writeQuery({
        query: GET_COMMENTS_BY_PRODUCT,
        variables: {
          productId,
        },
        data: {
          comments: [addedComment, ...comments],
        },
      });
    },
  });

  const addNewComment = useCallback(async () => {
    await createComment({
      variables: {
        comment,
        productId,
      },
    });
  }, [comment, createComment, productId]);
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TextInput
        style={styles.input}
        placeholder="Add comment"
        value={comment}
        onChangeText={setComment}
      />
      <TouchableOpacity
        style={styles.sendButton}
        disabled={!comment}
        onPress={addNewComment}>
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          fill="none"
          stroke="white"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round">
          <Path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
        </Svg>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  sendButton: {
    backgroundColor: 'orange',
    width: 60,
    height: 50,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
