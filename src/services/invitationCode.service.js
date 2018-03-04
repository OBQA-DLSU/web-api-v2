const invitationCode = require('../constants/affiliationCode');
module.exports = {
  readCode: (code) => {
    switch (code) {
      case invitationCode.CHE_COORDINATOR: return {ProgramId: 1, RoleId: 2, isAdmin: true, isStudent: false };
      case invitationCode.CHE_FACULTY: return {ProgramId: 1, RoleId: 2, isAdmin: false, isStudent: false };
      case invitationCode.CHE_STUDENT: return {program: 1, RoleId: 2, isAdmin: false, isStudent: true };
      case invitationCode.CE_COORDINATOR: return {ProgramId: 2, RoleId: 2, isAdmin: true, isStudent: false };
      case invitationCode.CE_FACULTY: return {ProgramId: 2, RoleId: 2, isAdmin: false, isStudent: false};
      case invitationCode.CE_STUDENT: return {program: 2, RoleId: 2, isAdmin: false, isStudent: true  };
      case invitationCode.CPE_COORDINATOR: return {ProgramId: 3, RoleId: 2, isAdmin: true, isStudent: false };
      case invitationCode.CPE_FACULTY: return {ProgramId: 3, RoleId: 2, isAdmin: false, isStudent: false};
      case invitationCode.CPE_STUDENT: return {program: 3, RoleId: 2, isAdmin: false, isStudent: true  };
      case invitationCode.ECE_COORDINATOR: return {ProgramId: 4, RoleId: 2, isAdmin: true, isStudent: false };
      case invitationCode.ECE_FACULTY: return {ProgramId: 4, RoleId: 2, isAdmin: false, isStudent: false};
      case invitationCode.ECE_STUDENT: return {program: 1, RoleId: 2, isAdmin: false, isStudent: true  };
      case invitationCode.IE_COORDINATOR: return {ProgramId: 5, RoleId: 2, isAdmin: true, isStudent: false };
      case invitationCode.IE_FACULTY: return {ProgramId: 5, RoleId: 2, isAdmin: false, isStudent: false};
      case invitationCode.IE_STUDENT: return {program: 5, RoleId: 2, isAdmin: false, isStudent: true  };
      case invitationCode.MEM_COORDINATOR: return {ProgramId: 6, RoleId: 2, isAdmin: true, isStudent: false };
      case invitationCode.MEM_FACULTY: return {ProgramId: 6, RoleId: 2, isAdmin: false, isStudent: false};
      case invitationCode.MEM_STUDENT: return {program: 6, RoleId: 2, isAdmin: false, isStudent: true  };
      case invitationCode.ME_COORDINATOR: return {ProgramId: 7, RoleId: 2, isAdmin: true, isStudent: false };
      case invitationCode.ME_FACULTY: return {ProgramId: 7, RoleId: 2, isAdmin: false, isStudent: false};
      case invitationCode.ME_STUDENT: return {program: 1, RoleId: 2, isAdmin: false, isStudent: true  };
      default: return null;
    }
  },
  convertToCode: (ProgramId, RoleId, isAdmin, isStudent) => {
    switch (JSON.parse(isStudent)) {
      case false: 
        switch(JSON.parse(isAdmin)) {
          case true:
            switch(ProgramId) {
              case 1: return invitationCode.CHE_COORDINATOR;
              case 2: return invitationCode.CE_COORDINATOR;
              case 3: return invitationCode.CPE_COORDINATOR;
              case 4: return invitationCode.ECE_COORDINATOR;
              case 5: return invitationCode.IE_COORDINATOR;
              case 6: return invitationCode.MEM_COORDINATOR;
              case 7: return invitationCode.ME_COORDINATOR;
            }
          case false:
            switch(ProgramId) {
              case 1: return invitationCode.CHE_FACULTY;
              case 2: return invitationCode.CE_FACULTY;
              case 3: return invitationCode.CPE_FACULTY;
              case 4: return invitationCode.ECE_FACULTY;
              case 5: return invitationCode.IE_FACULTY;
              case 6: return invitationCode.MEM_FACULTY;
              case 7: return invitationCode.ME_FACULTY;
            }
        }
      case true:
        switch(ProgramId) {
          case 1: return invitationCode.CHE_STUDENT;
          case 2: return invitationCode.CE_STUDENT;
          case 3: return invitationCode.CPE_STUDENT;
          case 4: return invitationCode.ECE_STUDENT;
          case 5: return invitationCode.IE_STUDENT;
          case 6: return invitationCode.MEM_STUDENT;
          case 7: return invitationCode.ME_STUDENT;
        }
      default: null;
    }
  }
}
