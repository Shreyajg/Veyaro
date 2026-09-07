import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);

import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

import ConnectDB from './config/db.js';

import School from './models/schools.models.js';
import Programme from './models/programmes.models.js';
import YearGroup from './models/yearGroups.models.js';
import Class from './models/classes.models.js';
import Timetable from './models/timetabels.models.js';

const timetableSchedule = [
  // Monday
  { day: 'Monday', classId: 'tok', startPeriod: 1, endPeriod: 1, startTime: '8:40', endTime: '9:25' },
  { day: 'Monday', classId: 'math-aa-hl', startPeriod: 2, endPeriod: 3, startTime: '9:25', endTime: '10:55' },
  { day: 'Monday', classId: 'physics-hl', startPeriod: 4, endPeriod: 5, startTime: '10:55', endTime: '12:25' },
  { day: 'Monday', classId: 'english-hl', startPeriod: 6, endPeriod: 6, startTime: '12:55', endTime: '1:40' },
  { day: 'Monday', classId: 'phe', startPeriod: 7, endPeriod: 8, startTime: '1:40', endTime: '3:10' },

  // Tuesday
  { day: 'Tuesday', classId: 'english-hl', startPeriod: 1, endPeriod: 2, startTime: '8:40', endTime: '10:10' },
  { day: 'Tuesday', classId: 'chemistry', startPeriod: 3, endPeriod: 4, startTime: '10:10', endTime: '11:40' },
  { day: 'Tuesday', classId: 'language', startPeriod: 5, endPeriod: 5, startTime: '11:40', endTime: '12:25' },
  { day: 'Tuesday', classId: 'career-counselling', startPeriod: 6, endPeriod: 6, startTime: '12:55', endTime: '1:40' },
  { day: 'Tuesday', classId: 'clubs', startPeriod: 7, endPeriod: 8, startTime: '1:40', endTime: '3:10' },

  // Wednesday
  { day: 'Wednesday', classId: 'english-hl', startPeriod: 1, endPeriod: 1, startTime: '8:40', endTime: '9:25' },
  { day: 'Wednesday', classId: 'math-aa-hl', startPeriod: 2, endPeriod: 3, startTime: '9:25', endTime: '10:55' },
  { day: 'Wednesday', classId: 'business-management', startPeriod: 4, endPeriod: 5, startTime: '10:55', endTime: '12:25' },
  { day: 'Wednesday', classId: 'chemistry', startPeriod: 6, endPeriod: 7, startTime: '12:55', endTime: '2:25' },
  { day: 'Wednesday', classId: 'ee', startPeriod: 8, endPeriod: 8, startTime: '2:25', endTime: '3:10' },

  // Thursday
  { day: 'Thursday', classId: 'english-hl', startPeriod: 1, endPeriod: 1, startTime: '8:40', endTime: '9:25' },
  { day: 'Thursday', classId: 'math-aa-hl', startPeriod: 2, endPeriod: 2, startTime: '9:25', endTime: '10:10' },
  { day: 'Thursday', classId: 'business-management', startPeriod: 3, endPeriod: 4, startTime: '10:10', endTime: '11:40' },
  { day: 'Thursday', classId: 'physics-hl', startPeriod: 5, endPeriod: 5, startTime: '11:40', endTime: '12:25' },
  { day: 'Thursday', classId: 'cas', startPeriod: 6, endPeriod: 6, startTime: '12:55', endTime: '1:40' },
  { day: 'Thursday', classId: 'spanish', startPeriod: 7, endPeriod: 8, startTime: '1:40', endTime: '3:10' },

  // Friday
  { day: 'Friday', classId: 'physics-hl', startPeriod: 2, endPeriod: 3, startTime: '9:25', endTime: '10:55' },
  { day: 'Friday', classId: 'tok', startPeriod: 4, endPeriod: 4, startTime: '10:55', endTime: '11:40' },
  { day: 'Friday', classId: 'spanish', startPeriod: 5, endPeriod: 5, startTime: '11:40', endTime: '12:25' },
  { day: 'Friday', classId: 'math-aa-hl', startPeriod: 6, endPeriod: 6, startTime: '12:55', endTime: '1:40' },
  { day: 'Friday', classId: 'chemistry', startPeriod: 7, endPeriod: 7, startTime: '1:40', endTime: '2:25' },
  { day: 'Friday', classId: 'business-management', startPeriod: 8, endPeriod: 8, startTime: '2:25', endTime: '3:10' }
];

const seedTimetable = async () => {
  try {
    await ConnectDB();

    const school = await School.findOne({
      schoolId: 'CBS'
    });

    const programme = await Programme.findOne({
      programmeId: 'IBDP'
    });

    const yearGroup = await YearGroup.findOne({
      yearGroupId: 'DP1'
    });

    if (!school) throw new Error('School CBS not found');
    if (!programme) throw new Error('Programme IBDP not found');
    if (!yearGroup) throw new Error('Year Group DP1 not found');

    const schedule = [];

    for (const block of timetableSchedule) {
      const classDoc = await Class.findOne({
        classId: block.classId
      });

      if (!classDoc) {
        console.log(
          `Skipping ${block.classId} — Class not found`
        );
        continue;
      }

      schedule.push({
        day: block.day,
        classId: classDoc._id,
        startPeriod: block.startPeriod,
        endPeriod: block.endPeriod,
        startTime: block.startTime,
        endTime: block.endTime
      });
    }

    const existing = await Timetable.findOne({
      timetableId: 'DP1-2026'
    });

    if (existing) {
      console.log('Timetable already exists. Updating it...');

      existing.schoolId = school._id;
      existing.programmeId = programme._id;
      existing.yearGroupId = yearGroup._id;
      existing.schedule = schedule;

      await existing.save();

      console.log('Timetable updated successfully.');
    } else {
      await Timetable.create({
        timetableId: 'DP1-2026',
        schoolId: school._id,
        programmeId: programme._id,
        yearGroupId: yearGroup._id,
        schedule
      });

      console.log('Timetable created successfully.');
    }

    console.log(`Added ${schedule.length} timetable blocks.`);

  } catch (error) {
    console.error('Timetable seed failed:', error);
  } finally {
    await mongoose.connection.close();
  }
};

seedTimetable();