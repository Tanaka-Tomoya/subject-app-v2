/* eslint-disable @typescript-eslint/camelcase */
import { QueryResolvers, Resolvers } from './types/gen/graphql-resolver-types';

const Query: QueryResolvers = {
  async findUser(_root, _, { userRepository }) {
    const result = await userRepository.findOne({ where: { id: '1' } });

    return result || null;
  },
  async test(_root, _, { courseRepository }) {
    const result = await courseRepository.findOne({ where: { id: '1' } });

    return result || null;
  },
  async searchCoursesByName(_root, args, { courseRepository }) {
    const result = await courseRepository.find({
      where: { course_name: args.course_name },
    });

    return result || null;
  },
  async searchCoursesByTeacher(_root, args, { courseRepository }) {
    const result = await courseRepository.find({
      where: { teacher_name: args.teacher_name },
    });

    return result || null;
  },

  async searchCoursesByBlock(_root, args, { courseRepository }) {
    const result = await courseRepository.find({
      where: { block: args.block },
    });

    return result || null;
  },

  async searchCoursesByCompulsory(_root, args, { courseRepository }) {
    const result = await courseRepository.find({
      where: { is_compulsory: true },
    });

    return result || null;
  },

  async searchCourses(_root, args, { courseRepository }) {
    let result;
    
    if (Object.keys(args).length === 0) {
      result =  await courseRepository.find();
    }

    if (args.course_name) {
      if (args.course_name === 'なし') {
        return;
      }
      result = await courseRepository.find({
        where: { course_name: args.course_name },
      });

    }
    if (args.block || args.block === 'なし') {
      if (args.block === 'なし') {
        return;
      }
      result = await courseRepository.find({
        where: { block: args.block },
      });
    }
    if (args.teacher_name || args.teacher_name === 'なし') {
      if (args.teacher_name=== 'なし') {
        return;
      }
      result = await courseRepository.find({
        where: { teacher_name: args.teacher_name },
      });
    }
    if (args.is_compulsory) {
      result = await courseRepository.find({
        where: { is_compulsory: args.is_compulsory },
      });
    }
    return result || null;
  }

};

export const resolvers: Resolvers = {
  Query,
};

// searchCoursesByCompulsory
