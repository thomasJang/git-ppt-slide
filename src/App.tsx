import { ArrowLeft, ArrowRight, BookOpen, Clock3, Play } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type Slide = {
  eyebrow: string;
  title: string;
  message: string;
  content: string;
  example: string;
  note: string;
};

const slides: Slide[] = [
  {
    eyebrow: "01 Intro",
    title: "Git 활용 특강",
    message: "Git은 개발자의 필수 도구이며 AI 시대에도 더욱 중요해지고 있다.",
    content:
      "오늘 강의는 Git 명령어를 외우는 시간이 아닙니다. 개발자가 어떻게 코드를 관리하고, 어떻게 협업하며, 어떻게 실수를 복구하는지 배우는 시간입니다.\n\nGit은 단순한 소스코드 저장소가 아닙니다. 변경 이력을 기록하고, 실험을 분리하고, 안전하게 협업할 수 있도록 도와주는 시스템입니다.\n\n특히 AI가 코드를 생성하는 시대에는 어떤 코드가 언제, 왜 바뀌었는지를 추적하는 능력이 더욱 중요해지고 있습니다.",
    example: "AI가 만든 코드도\n결국 사람이 검증해야 한다.\n\nGit은 그 과정을 기록한다.",
    note: "오늘은 Git 사용법보다 Git을 사용하는 이유를 이해하는 것이 중요하다고 강조한다.",
  },
  {
    eyebrow: "01 Intro",
    title: "개발자는 왜 Git을 사용할까?",
    message: "코드는 계속 바뀌기 때문이다.",
    content:
      "소프트웨어는 완성되는 순간 끝나는 제품이 아닙니다.\n\n배포 이후에도 버그 수정, 기능 추가, UI 개선, 성능 개선, 보안 패치가 계속 반복됩니다.\n\n서비스가 오래될수록 코드 변경 횟수는 기하급수적으로 증가합니다. Git은 이러한 변경을 체계적으로 관리하기 위해 만들어졌습니다.",
    example: "v1\n ↓\nv2\n ↓\nv3\n ↓\nv4\n ↓\nv5",
    note: "카카오톡도 매일 수십~수백 번 변경된다고 설명.",
  },
  {
    eyebrow: "01 Intro",
    title: "Git이 없던 시절",
    message: "버전 관리가 없으면 프로젝트는 혼란에 빠진다.",
    content:
      "Git이 없던 시절 개발자들은 파일을 복사하여 버전을 관리했습니다.\n\n예를 들면 project.zip, project-final.zip, project-final-real.zip, project-final-real-final.zip처럼 이름을 계속 바꿨습니다.\n\n문제는 어떤 파일이 최신인지 알 수 없다는 것입니다. 또한 실수로 파일을 덮어쓰면 복구가 어렵습니다. 여러 명이 동시에 작업하는 것도 사실상 불가능합니다.",
    example: "project.zip\n\nproject-final.zip\n\nproject-final-real.zip\n\nproject-final-real-final.zip",
    note: "\"final-final-final.zip 만든 적 있나요?\"",
  },
  {
    eyebrow: "01 Intro",
    title: "버전 관리란?",
    message: "버전 관리는 소프트웨어의 역사를 기록하는 기술이다.",
    content:
      "버전 관리는 단순 백업이 아닙니다.\n\n언제, 누가, 무엇을, 왜 변경했는지 기록합니다.\n\n그리고 필요하면 언제든 특정 시점으로 돌아갈 수 있습니다. Git은 프로젝트를 시간의 흐름 속에서 이해하고 복구할 수 있게 만드는 타임머신 같은 도구입니다.",
    example: "v1 → v2 → v3 → v4",
    note: "Git = 타임머신",
  },
  {
    eyebrow: "01 Intro",
    title: "실무에서 발생하는 문제",
    message: "협업은 생각보다 복잡하다.",
    content:
      "개발자 A는 로그인 기능을 개발하고 있습니다.\n\n개발자 B는 회원가입 기능을 수정합니다.\n\n개발자 C는 버그를 수정합니다.\n\n이 모든 변경을 안전하게 하나의 프로젝트에 반영해야 합니다. Git은 이러한 협업 문제를 해결하기 위해 존재합니다.",
    example: "Developer A\nDeveloper B\nDeveloper C\n\n      ↓\n\n   Project",
    note: "여러 사람이 같은 프로젝트를 동시에 바꾸는 상황을 먼저 상상하게 한다.",
  },
  {
    eyebrow: "01 Intro",
    title: "Git은 무엇인가?",
    message: "Git은 분산 버전 관리 시스템이다.",
    content:
      "Git은 Distributed Version Control System(DVCS)입니다.\n\n모든 개발자가 프로젝트 전체 이력을 가지고 있습니다.\n\n인터넷이 없어도 작업할 수 있으며, Commit, Branch, Merge 기능을 제공합니다. Git은 로컬에서도 독립적으로 기록하고 실험할 수 있게 해줍니다.",
    example: "Developer A\n    ↓\n Local Repo\n\nDeveloper B\n    ↓\n Local Repo",
    note: "GitHub보다 Git 자체가 먼저라는 점을 분리해서 설명한다.",
  },
  {
    eyebrow: "01 Intro",
    title: "Git이 해결한 문제",
    message: "Git은 개발자의 실수를 두려워하지 않게 만든다.",
    content:
      "실수로 파일을 삭제해도 복구할 수 있습니다.\n\n새로운 기능을 실험하다 실패해도 되돌릴 수 있습니다.\n\nGit은 실패 비용을 낮춰주는 도구입니다. 개발자는 안전망이 있을 때 더 적극적으로 실험하고 개선할 수 있습니다.",
    example: "git restore .\n\ngit reset\n\ngit checkout",
    note: "Git은 실수를 없애는 도구가 아니라 실수해도 회복하게 하는 도구라고 강조한다.",
  },
  {
    eyebrow: "01 Intro",
    title: "Git과 GitHub",
    message: "Git과 GitHub는 서로 다른 개념이다.",
    content:
      "Git은 버전 관리 프로그램입니다.\n\nGitHub는 Git 저장소를 공유하는 서비스입니다.\n\nGit은 혼자서도 사용할 수 있습니다. GitHub는 협업을 위해 사용합니다. 두 개념을 구분하면 이후 PR, Review, Merge 흐름을 더 쉽게 이해할 수 있습니다.",
    example: "Git\n ↓\nCommit\n\nGitHub\n ↓\nPR\nReview\nMerge",
    note: "Git은 도구, GitHub는 협업 서비스라는 구분을 반복한다.",
  },
  {
    eyebrow: "01 Intro",
    title: "실무 개발 흐름",
    message: "모든 개발팀은 Git 중심으로 움직인다.",
    content:
      "실무 개발은 요구사항에서 시작합니다.\n\n요구사항을 분석하고, 개발하고, Commit을 남기고, Pull Request를 만들고, Review를 거쳐 Merge한 뒤 Deploy합니다.\n\nGit은 코드 저장을 넘어 팀의 작업 흐름 전체를 연결하는 기준점입니다.",
    example: "요구사항\n ↓\n개발\n ↓\nCommit\n ↓\nPR\n ↓\nReview\n ↓\nMerge\n ↓\nDeploy",
    note: "Git을 명령어 묶음이 아니라 실무 프로세스의 중심으로 보여준다.",
  },
  {
    eyebrow: "01 Intro",
    title: "오늘 배울 내용",
    message: "Git 사용법보다 Git 사고방식을 배운다.",
    content:
      "다음 파트에서는 Repository, Commit, Branch, Merge, GitHub, Conflict를 실습합니다.\n\n명령어를 외우는 것보다 중요한 것은 Git이 어떤 문제를 해결하려고 만들어졌는지 이해하는 것입니다.\n\n실습을 통해 Git의 흐름을 몸으로 익히게 됩니다.",
    example: "git init\n\ngit add\n\ngit commit\n\ngit branch\n\ngit merge",
    note: "명령어 암기보다 흐름 이해가 목표라고 정리한다.",
  },
  {
    eyebrow: "02 Git Basic",
    title: "첫 Git 프로젝트 만들기",
    message: "Git은 직접 사용해 봐야 이해된다.",
    content:
      "오늘은 Todo App 프로젝트를 만들면서 Git을 배워보겠습니다.\n\n실제 현업 개발자가 사용하는 방식 그대로 진행합니다.\n\n폴더를 만들고, Git 저장소로 초기화하고, 파일을 수정하고, add와 commit을 반복하며 Git의 흐름을 몸으로 익히는 것이 목표입니다.",
    example: "mkdir todo-app\ncd todo-app\ngit init",
    note: "개념 설명보다 손으로 직접 입력하며 흐름을 익히는 파트라고 안내한다.",
  },
  {
    eyebrow: "02 Git Basic",
    title: "git init",
    message: "Git 프로젝트의 시작",
    content:
      "git init은 현재 폴더를 Git 저장소로 만듭니다.\n\n이 명령을 실행하면 Git이 프로젝트 변경 이력을 기록할 준비를 합니다.\n\n아직 파일이 자동으로 기록되는 것은 아닙니다. 이제부터 어떤 파일을 Git에 올리고 어떤 시점에 commit할지 개발자가 결정합니다.",
    example: "git init\n\nInitialized empty Git repository",
    note: "git init은 Git 관리 시작 버튼이라고 설명한다.",
  },
  {
    eyebrow: "02 Git Basic",
    title: "git status",
    message: "Git 사용자의 나침반",
    content:
      "git status는 실무에서 가장 많이 사용하는 명령어 중 하나입니다.\n\n현재 브랜치, 변경된 파일, commit할 파일, 아직 Git이 관리하지 않는 파일을 알려줍니다.\n\nGit을 사용하다가 헷갈리면 먼저 status를 확인하면 됩니다. status는 현재 위치를 알려주는 나침반입니다.",
    example: "git status\n\nOn branch main\nnothing to commit",
    note: "실습 중 막히면 무조건 git status부터 확인하게 한다.",
  },
  {
    eyebrow: "02 Git Basic",
    title: "README 만들기",
    message: "첫 파일을 만들고 Git 상태를 확인한다.",
    content:
      "Todo App 프로젝트의 첫 파일로 README.md를 만듭니다.\n\nREADME는 프로젝트가 무엇인지 설명하는 문서입니다.\n\n파일을 만든 뒤 git status를 실행하면 README.md가 Untracked files에 표시됩니다. Git은 파일이 생긴 것을 알지만 아직 관리 대상으로 등록하지 않았습니다.",
    example: "echo \"# Todo App\" > README.md\n\ngit status\n\nUntracked files:\nREADME.md",
    note: "새 파일을 만든 직후 status가 어떻게 바뀌는지 집중해서 보게 한다.",
  },
  {
    eyebrow: "02 Git Basic",
    title: "Untracked 상태",
    message: "Git이 아직 관리하지 않는 파일",
    content:
      "Untracked는 Git이 아직 관리하지 않는 파일이라는 뜻입니다.\n\n파일은 프로젝트 폴더에 존재하지만 Git 이력에는 포함되지 않았습니다.\n\nGit은 모든 새 파일을 자동으로 기록하지 않습니다. 개발자가 git add를 사용해 commit 대상으로 등록해야 합니다.",
    example: "README.md\nUntracked",
    note: "Untracked는 오류가 아니라 아직 추적하지 않는 정상 상태라고 설명한다.",
  },
  {
    eyebrow: "02 Git Basic",
    title: "git add",
    message: "Commit 대상으로 등록",
    content:
      "git add는 파일을 commit 대상으로 등록하는 명령입니다.\n\nREADME.md만 올릴 수도 있고, git add .으로 현재 폴더의 변경을 한 번에 올릴 수도 있습니다.\n\n중요한 점은 add가 저장이 아니라는 것입니다. add는 다음 commit에 포함할 후보를 고르는 단계입니다.",
    example: "git add README.md\n\n# 또는\n\ngit add .",
    note: "add는 commit 장바구니에 담는 과정이라고 설명한다.",
  },
  {
    eyebrow: "02 Git Basic",
    title: "git status 다시 보기",
    message: "Staging 상태를 확인한다.",
    content:
      "git add 이후 다시 git status를 실행합니다.\n\n이제 README.md는 Changes to be committed 영역에 표시됩니다.\n\n이 상태는 staging area에 올라간 상태입니다. Git은 이제 이 파일을 다음 commit에 포함할 준비가 되었다고 알려줍니다.",
    example: "git status\n\nChanges to be committed:\nREADME.md",
    note: "add 전후 status 출력 차이를 비교하게 한다.",
  },
  {
    eyebrow: "02 Git Basic",
    title: "첫 Commit",
    message: "프로젝트의 첫 기록을 만든다.",
    content:
      "git commit은 staging area에 올라간 변경을 하나의 기록으로 남깁니다.\n\n첫 commit 메시지는 README를 추가했다는 의미가 드러나도록 작성합니다.\n\n이제 프로젝트에는 Commit A라는 첫 번째 스냅샷이 생겼습니다.",
    example: "git commit -m \"docs: add README\"\n\nCommit A",
    note: "commit은 저장 버튼이 아니라 의미 있는 기록 생성이라고 강조한다.",
  },
  {
    eyebrow: "02 Git Basic",
    title: "Commit이란?",
    message: "Commit은 저장이 아니라 스냅샷이다.",
    content:
      "Commit은 특정 시점의 프로젝트 상태를 기록한 스냅샷입니다.\n\n단순 저장과 달리 메시지, 작성자, 시간, 이전 commit과의 연결 정보가 함께 남습니다.\n\n나중에 log를 보면 프로젝트가 어떤 순서로 성장했는지 commit 단위로 확인할 수 있습니다.",
    example: "Commit = Snapshot\n\nREADME.md\nTime\nAuthor\nMessage",
    note: "Ctrl+S와 commit의 차이를 분명히 설명한다.",
  },
  {
    eyebrow: "02 Git Basic",
    title: "Todo 기능 추가",
    message: "기능을 추가하고 두 번째 Commit을 만든다.",
    content:
      "이제 Todo 목록을 화면에 추가합니다.\n\nStudy Git이라는 Todo 항목을 만들고 commit합니다.\n\n첫 번째 commit이 README였다면 두 번째 commit은 실제 기능의 시작입니다. 이렇게 작은 단위로 기록하면 작업 흐름이 선명해집니다.",
    example: "<ul>\n  <li>Study Git</li>\n</ul>\n\nA → B",
    note: "기능 하나가 추가될 때마다 commit으로 기록하는 습관을 보여준다.",
  },
  {
    eyebrow: "02 Git Basic",
    title: "Todo 등록 기능 추가",
    message: "기능 단위로 Commit 한다.",
    content:
      "다음으로 Todo 등록 기능을 추가합니다.\n\n사용자가 새 Todo를 입력하고 목록에 추가할 수 있게 만드는 단계입니다.\n\n이 변경도 별도의 commit으로 남깁니다. 기능이 커질수록 commit을 나누는 습관이 문제 해결에 큰 도움이 됩니다.",
    example: "Todo 등록 기능\n\nA → B → C",
    note: "작은 기능 단위로 commit을 나누는 이유를 반복해서 강조한다.",
  },
  {
    eyebrow: "02 Git Basic",
    title: "Todo 삭제 기능 추가",
    message: "Todo App의 기능 흐름을 완성한다.",
    content:
      "마지막으로 Todo 삭제 기능을 추가합니다.\n\n목록에서 항목을 제거할 수 있으면 Todo App의 기본 흐름이 완성됩니다.\n\nREADME, 목록, 등록, 삭제가 각각 commit으로 남아 A → B → C → D 흐름을 만들게 됩니다.",
    example: "Todo 삭제 기능\n\nA → B → C → D",
    note: "앱이 commit을 따라 성장하는 모습을 확인하게 한다.",
  },
  {
    eyebrow: "02 Git Basic",
    title: "git log",
    message: "Commit 이력을 확인한다.",
    content:
      "git log --oneline은 commit 이력을 간단히 보여줍니다.\n\n방금 만든 D, C, B, A commit을 최신순으로 확인할 수 있습니다.\n\nlog를 읽으면 프로젝트가 어떤 순서로 만들어졌는지 한눈에 볼 수 있습니다.",
    example: "git log --oneline\n\nD\nC\nB\nA",
    note: "직접 만든 commit들이 log에 보이는 순간을 확인하게 한다.",
  },
  {
    eyebrow: "02 Git Basic",
    title: "git log --graph",
    message: "Commit 흐름을 그래프로 본다.",
    content:
      "git log --graph --oneline은 commit 흐름을 그래프 형태로 보여줍니다.\n\n지금은 일직선으로 보이지만 branch를 배우면 그래프가 갈라지고 합쳐지는 모습을 볼 수 있습니다.\n\nGit은 파일 목록이 아니라 commit 그래프를 관리합니다.",
    example: "git log --graph --oneline\n\n* D\n* C\n* B\n* A",
    note: "다음 Branch 파트를 이해하기 위한 다리로 연결한다.",
  },
  {
    eyebrow: "02 Git Basic",
    title: "실수해 보기",
    message: "실수를 통해 복구를 배운다.",
    content:
      "README를 일부러 수정해 봅니다.\n\n실무에서도 잘못된 수정은 자주 발생합니다.\n\n수정 후 git status를 실행하면 modified 상태가 표시됩니다. 이제 Git이 변경을 감지했지만 아직 commit하지 않은 상태입니다.",
    example: "README 수정\n\ngit status\nmodified",
    note: "Git 복구 기능은 실제 실수 상황을 만들어 봐야 잘 이해된다고 안내한다.",
  },
  {
    eyebrow: "02 Git Basic",
    title: "git restore",
    message: "Commit하지 않은 변경을 되돌린다.",
    content:
      "git restore README.md는 Working Directory의 변경을 마지막 commit 상태로 되돌립니다.\n\n잘못 수정한 파일을 원래 상태로 복구할 때 사용합니다.\n\n단, restore를 실행하면 수정 내용이 사라질 수 있으므로 실행 전 git status로 상태를 확인해야 합니다.",
    example: "git restore README.md",
    note: "복구 명령은 편리하지만 되돌릴 내용이 사라질 수 있음을 강조한다.",
  },
  {
    eyebrow: "02 Git Basic",
    title: "git restore --staged",
    message: "Staging Area에 올린 변경을 내린다.",
    content:
      "git restore --staged README.md는 add한 파일을 staging area에서 내립니다.\n\n파일 내용이 없어지는 것은 아닙니다.\n\ncommit 후보에서 제외될 뿐입니다. add를 실수해도 당황하지 않고 staged 상태만 취소할 수 있습니다.",
    example: "git restore --staged README.md",
    note: "restore와 restore --staged의 차이를 Working Directory와 Staging Area로 구분한다.",
  },
  {
    eyebrow: "02 Git Basic",
    title: "실무에서 가장 많이 쓰는 명령어",
    message: "자주 쓰는 명령어부터 몸에 익힌다.",
    content:
      "실무에서 가장 자주 쓰는 명령어는 git status, git add ., git commit, git pull, git push입니다.\n\n복잡한 명령어보다 이 기본 흐름을 정확히 이해하는 것이 중요합니다.\n\n작업 전에는 pull, 작업 중에는 status, 기록할 때는 add와 commit, 공유할 때는 push를 사용합니다.",
    example: "git status\ngit add .\ngit commit\ngit pull\ngit push",
    note: "이 다섯 명령어가 일상 루틴이 된다고 설명한다.",
  },
  {
    eyebrow: "02 Git Basic",
    title: "Git Workflow 정리",
    message: "Create, Modify, Add, Commit, Log 흐름을 이해한다.",
    content:
      "Git Basic의 핵심은 흐름입니다.\n\n프로젝트를 만들고, 파일을 수정하고, add로 commit 대상을 고르고, commit으로 기록하고, log로 이력을 확인합니다.\n\n이 흐름을 반복하면 Git의 기본 사용법을 자연스럽게 익힐 수 있습니다.",
    example: "Create\n↓\nModify\n↓\nAdd\n↓\nCommit\n↓\nLog",
    note: "명령어를 따로 외우기보다 흐름 안에서 기억하게 한다.",
  },
  {
    eyebrow: "02 Git Basic",
    title: "다음 단계",
    message: "이제 Branch와 Merge로 넘어간다.",
    content:
      "Git Basic에서는 혼자 작업하며 프로젝트를 기록하는 방법을 배웠습니다.\n\n다음 단계에서는 Branch와 Merge를 배웁니다.\n\nBranch를 사용하면 새로운 기능을 안전하게 실험하고, Merge를 통해 완성된 기능을 다시 합칠 수 있습니다.",
    example: "Branch\nMerge\nComing Soon",
    note: "혼자 쓰는 Git에서 여러 작업 흐름을 다루는 Git으로 넘어간다고 예고한다.",
  },
  {
    eyebrow: "03 Branch & Merge",
    title: "왜 Branch가 필요한가?",
    message: "운영 중인 서비스를 안전하게 보호하기 위해 Branch를 사용한다.",
    content:
      "Todo App 서비스가 운영 중이라고 가정해 보겠습니다.\n\n사용자들은 매일 Todo를 등록하고 삭제합니다. 그런데 새로운 로그인 기능을 추가해야 합니다.\n\nmain 브랜치에서 바로 개발하면 미완성 기능 노출, 서비스 장애, 배포 실패가 발생할 수 있습니다. Git은 이러한 문제를 해결하기 위해 Branch를 제공합니다.",
    example: "Production\n\nmain",
    note: "Branch는 개발자의 실험실이라고 설명한다.",
  },
  {
    eyebrow: "03 Branch & Merge",
    title: "로그인 기능 개발 요청",
    message: "새 기능은 별도의 공간에서 개발한다.",
    content:
      "고객이 로그인 기능을 요청했습니다.\n\n현재 서비스는 정상 동작 중입니다.\n\n기존 기능을 건드리지 않고 로그인 기능을 개발해야 합니다. 이때 Branch를 사용합니다. Branch는 안전한 격리 공간을 만들어줍니다.",
    example: "Todo App\n\n+ Login Feature",
    note: "운영 코드와 개발 코드를 분리해야 하는 이유를 묻는다.",
  },
  {
    eyebrow: "03 Branch & Merge",
    title: "Branch란?",
    message: "Branch는 독립된 작업 공간이다.",
    content:
      "Branch는 현재 상태를 기반으로 새로운 작업 공간을 생성합니다.\n\n다른 Branch에 영향을 주지 않고 자유롭게 개발할 수 있습니다.\n\n기능 개발, 버그 수정, 실험을 서로 분리하면 main을 안정적으로 유지할 수 있습니다.",
    example: "main\n\nA\n\n   feature/login",
    note: "Branch는 복사본이 아니라 Commit을 가리키는 포인터라고 맛보기로 언급한다.",
  },
  {
    eyebrow: "03 Branch & Merge",
    title: "Branch 생성",
    message: "새로운 기능 개발은 Branch 생성으로 시작한다.",
    content:
      "새로운 로그인 기능을 만들기 위해 feature/login Branch를 생성합니다.\n\n예전 방식으로는 git checkout -b를 많이 사용했고, 최근에는 git switch -c도 사용할 수 있습니다.\n\n명령 실행 후 현재 작업 위치가 새 Branch로 이동합니다.",
    example: "git checkout -b feature/login\n\n# 또는\n\ngit switch -c feature/login\n\nSwitched to a new branch\n'feature/login'",
    note: "checkout과 switch 둘 다 보여주되 실습에서는 하나를 정해 사용한다.",
  },
  {
    eyebrow: "03 Branch & Merge",
    title: "Branch 확인",
    message: "현재 브랜치를 확인하는 습관이 중요하다.",
    content:
      "git branch 명령으로 현재 작업 중인 Branch를 확인할 수 있습니다.\n\n별표(*)가 붙은 Branch가 현재 위치입니다.\n\n작업 전에 내가 어느 Branch에 있는지 확인하는 습관은 매우 중요합니다. 잘못된 Branch에서 작업하면 나중에 정리 비용이 커집니다.",
    example: "git branch\n\n* feature/login\n  main",
    note: "실습 중 명령 실행 전 현재 Branch를 꼭 확인하게 한다.",
  },
  {
    eyebrow: "03 Branch & Merge",
    title: "로그인 화면 개발",
    message: "기능은 작은 단위로 Commit 한다.",
    content:
      "로그인 기능 개발의 첫 번째 Commit은 LoginPage 컴포넌트를 만드는 것입니다.\n\n큰 기능도 작은 단계로 나누면 이해하기 쉽고 되돌리기도 쉽습니다.\n\n하나의 Commit은 하나의 의미 있는 변경을 담는 것이 좋습니다.",
    example: "Commit 1\n\n<LoginPage />\n\nA → B",
    note: "작은 Commit이 리뷰와 복구에 유리하다고 설명한다.",
  },
  {
    eyebrow: "03 Branch & Merge",
    title: "로그인 입력창 추가",
    message: "작은 변경도 Commit 한다.",
    content:
      "두 번째 Commit에서는 로그인 입력창을 추가합니다.\n\n입력 UI를 추가하는 변경과 버튼을 추가하는 변경을 분리하면 나중에 어떤 변경에서 문제가 생겼는지 추적하기 쉽습니다.\n\n작은 Commit은 미래의 디버깅 시간을 줄여줍니다.",
    example: "Commit 2\n\n<input />\n\nA → B → C",
    note: "너무 작은 Commit이 아니라 의미 있는 단위로 작게 나누는 것이 핵심이다.",
  },
  {
    eyebrow: "03 Branch & Merge",
    title: "로그인 버튼 추가",
    message: "기능별 Commit 기록은 미래의 자산이다.",
    content:
      "세 번째 Commit에서는 로그인 버튼을 추가합니다.\n\n기능이 완성될수록 Commit 그래프에는 작업의 흐름이 남습니다.\n\n나중에 리뷰어는 Commit 단위로 변경 의도를 읽을 수 있고, 개발자는 문제 발생 시 특정 Commit으로 좁혀서 확인할 수 있습니다.",
    example: "Commit 3\n\n<button>Login</button>\n\nA → B → C → D",
    note: "Commit 기록은 미래의 자신과 동료를 위한 문서라고 연결한다.",
  },
  {
    eyebrow: "03 Branch & Merge",
    title: "Branch 그래프 이해하기",
    message: "Branch는 Commit 그래프를 확장한다.",
    content:
      "Git은 파일이 아니라 Commit 그래프를 관리합니다.\n\nBranch는 단순한 포인터입니다.\n\nmain에서 갈라진 feature/login Branch가 B, C, D Commit을 만들면 Git 그래프는 새로운 작업 흐름을 가지게 됩니다.",
    example: "main\n\nA\n\n   B\n       C\n           D",
    note: "Branch를 폴더 복사로 오해하지 않도록 포인터 개념을 가볍게 설명한다.",
  },
  {
    eyebrow: "03 Branch & Merge",
    title: "여러 기능 동시 개발",
    message: "Branch는 병렬 개발을 가능하게 만든다.",
    content:
      "동시에 로그인, 회원가입, 비밀번호 찾기 기능을 개발할 수 있습니다.\n\n각 기능은 서로 다른 Branch에서 독립적으로 진행됩니다.\n\nBranch 덕분에 여러 개발자가 같은 프로젝트에서 서로의 작업을 방해하지 않고 병렬로 개발할 수 있습니다.",
    example: "main\n\n├─ feature/login\n\n├─ feature/signup\n\n└─ feature/password",
    note: "팀 개발에서 Branch가 왜 필수인지 연결한다.",
  },
  {
    eyebrow: "03 Branch & Merge",
    title: "Merge란?",
    message: "개발 완료된 기능을 합치는 작업",
    content:
      "로그인 기능 개발이 완료되었습니다.\n\n이제 feature/login Branch의 변경을 main Branch에 반영합니다.\n\nMerge는 분리된 작업 흐름을 다시 하나로 합치는 과정입니다. 협업에서는 Merge 전에 리뷰와 테스트를 거치는 것이 일반적입니다.",
    example: "git merge feature/login",
    note: "Merge는 끝이 아니라 검증된 변경을 통합하는 단계라고 설명한다.",
  },
  {
    eyebrow: "03 Branch & Merge",
    title: "Fast Forward Merge",
    message: "가장 단순한 Merge 방식",
    content:
      "Fast Forward Merge는 main에 추가 변경이 없고 feature만 앞으로 진행된 경우 발생합니다.\n\n이때 Git은 main 포인터를 feature의 최신 Commit으로 앞으로 이동시키기만 하면 됩니다.\n\n새로운 Merge Commit이 필요하지 않은 가장 단순한 방식입니다.",
    example: "main 변경 없음\nfeature만 변경됨\n\nA → B → C",
    note: "포인터가 앞으로 이동하는 그림으로 설명한다.",
  },
  {
    eyebrow: "03 Branch & Merge",
    title: "Merge Commit",
    message: "협업에서는 Merge Commit이 자주 발생한다.",
    content:
      "main도 변경되고 feature도 변경되면 단순히 포인터를 앞으로 옮길 수 없습니다.\n\n이때 Git은 두 흐름을 합치는 새로운 Merge Commit을 생성합니다.\n\n협업에서는 여러 사람이 동시에 작업하기 때문에 Merge Commit이 자주 발생합니다.",
    example: "A → B → D\n \\       /\n  C -----",
    note: "두 작업 흐름이 만나면서 새 Commit이 생긴다고 설명한다.",
  },
  {
    eyebrow: "03 Branch & Merge",
    title: "Merge 후 정리",
    message: "Merge가 끝난 Branch는 제거한다.",
    content:
      "Merge가 끝난 feature/login Branch는 더 이상 필요하지 않습니다.\n\n사용이 끝난 Branch는 삭제해서 목록을 정리합니다.\n\nBranch를 계속 쌓아두면 어떤 Branch가 살아 있는 작업인지 알기 어려워집니다.",
    example: "git branch -d feature/login\n\nfeature/login\n\nDeleted",
    note: "정리도 협업 품질의 일부라고 설명한다.",
  },
  {
    eyebrow: "03 Branch & Merge",
    title: "Rebase란?",
    message: "Commit 기록을 정리하는 기술",
    content:
      "Rebase는 Branch의 시작점을 옮깁니다.\n\n히스토리를 더 깔끔하게 만들 수 있습니다.\n\n하지만 이미 공유된 Commit을 함부로 Rebase하면 협업에 혼란을 줄 수 있습니다. 처음에는 개념만 이해하고 팀 규칙을 따르는 것이 중요합니다.",
    example: "Before\n\nA → B\n\nA → C\n\nAfter\n\nA → B → C",
    note: "Rebase는 강력하지만 조심해야 하는 도구라고 소개한다.",
  },
  {
    eyebrow: "03 Branch & Merge",
    title: "Merge vs Rebase",
    message: "둘 다 합치지만 목적이 다르다.",
    content:
      "Merge는 안전하고 기록을 보존합니다.\n\nRebase는 깔끔한 이력과 선형 그래프를 만들 수 있습니다.\n\n둘 다 변경을 합치는 방법이지만 목적과 사용 상황이 다릅니다. 팀의 협업 규칙에 따라 선택해야 합니다.",
    example: "Merge\n- 안전\n- 기록 보존\n\nRebase\n- 깔끔한 이력\n- 선형 그래프\n\nMerge ≠ Rebase",
    note: "초보자는 Merge를 먼저 익히고 Rebase는 팀 규칙 안에서 사용하게 한다.",
  },
  {
    eyebrow: "03 Branch & Merge",
    title: "Git Flow",
    message: "대규모 프로젝트를 위한 전략",
    content:
      "Git Flow는 대규모 프로젝트를 위한 Branch 전략입니다.\n\nmain, develop, release, hotfix, feature Branch를 나누어 운영합니다.\n\n복잡하지만 릴리스 주기가 뚜렷한 프로젝트에서는 안정적으로 버전을 관리할 수 있습니다.",
    example: "main\ndevelop\nrelease\nhotfix\nfeature\n\nmain\ndevelop\nfeature/*",
    note: "전략은 프로젝트 규모와 배포 방식에 따라 달라진다고 설명한다.",
  },
  {
    eyebrow: "03 Branch & Merge",
    title: "GitHub Flow",
    message: "가볍고 빠른 전략",
    content:
      "GitHub Flow는 main, feature, PR, Merge 중심의 가볍고 빠른 전략입니다.\n\n작은 기능을 Branch에서 개발하고 Pull Request로 검토한 뒤 main에 합칩니다.\n\n지속 배포와 빠른 피드백에 잘 어울립니다.",
    example: "main\n ↓\nfeature\n ↓\nPR",
    note: "많은 웹 서비스와 스타트업에서 이해하기 쉬운 전략이라고 소개한다.",
  },
  {
    eyebrow: "03 Branch & Merge",
    title: "AXBOOT 전략",
    message: "실무에서는 단순한 전략이 강하다.",
    content:
      "AXBOOT는 main, dev, feat/* 전략을 사용합니다.\n\nmain은 안정 버전, dev는 개발 통합, feat/*는 기능 개발에 사용합니다.\n\n실무에서는 복잡한 전략보다 팀이 지속적으로 지킬 수 있는 단순한 규칙이 더 강할 때가 많습니다.",
    example: "main\ndev\nfeat/*",
    note: "브랜치 전략은 정답보다 지속 가능성이 중요하다고 강조한다.",
  },
  {
    eyebrow: "03 Branch & Merge",
    title: "Branch 정리",
    message: "Branch는 안전한 실험 공간이다.",
    content:
      "오늘은 Branch 생성, Commit, Merge, Rebase, Git Flow, GitHub Flow를 배웠습니다.\n\nBranch는 안전한 실험 공간이며, Merge는 검증된 작업을 다시 합치는 과정입니다.\n\n다음 파트에서는 GitHub와 Pull Request를 다룹니다.",
    example: "git branch\ngit merge\ngit rebase",
    note: "혼자 쓰는 Git에서 협업하는 Git으로 넘어가는 연결 지점을 만든다.",
  },
  {
    eyebrow: "04 GitHub & PR",
    title: "GitHub는 왜 필요할까?",
    message: "GitHub는 협업을 위한 플랫폼이다.",
    content:
      "Git만으로도 버전 관리는 가능합니다.\n\n하지만 여러 명이 함께 개발하려면 코드 공유가 필요합니다.\n\nGitHub는 코드 저장, 협업, 코드 리뷰, Pull Request 기능을 제공합니다. 실무에서는 Git 명령어보다 GitHub 화면을 더 자주 보게 됩니다.",
    example: "Developer\n    ↓\n  GitHub\n    ↓\n   Team",
    note: "Git = 엔진, GitHub = 도로 비유를 사용한다.",
  },
  {
    eyebrow: "04 GitHub & PR",
    title: "GitHub 저장소 만들기",
    message: "협업의 시작은 Repository 생성이다.",
    content:
      "GitHub에서 새로운 저장소를 생성합니다.\n\nTodo App 프로젝트를 업로드할 저장 공간입니다.\n\nRepository 생성 시 Public과 Private을 선택할 수 있습니다. 공개 프로젝트인지 팀 내부 프로젝트인지에 따라 설정이 달라집니다.",
    example: "New Repository\n\ntodo-app\n\nPublic\nPrivate",
    note: "저장소 공개 범위는 프로젝트 성격에 따라 선택한다고 설명한다.",
  },
  {
    eyebrow: "04 GitHub & PR",
    title: "원격 저장소 연결",
    message: "Local Repository와 GitHub를 연결한다.",
    content:
      "로컬에서 만든 Git 저장소를 GitHub 저장소와 연결합니다.\n\norigin은 원격 저장소의 별칭입니다.\n\n한 번 연결해두면 이후 push와 pull 명령으로 로컬과 GitHub 사이의 변경을 주고받을 수 있습니다.",
    example: "git remote add origin https://github.com/user/todo-app.git\n\nLocal Repo\n    ↓\n  origin\n    ↓\n GitHub",
    note: "origin은 주소 자체가 아니라 원격 저장소를 부르는 이름이라고 설명한다.",
  },
  {
    eyebrow: "04 GitHub & PR",
    title: "Push",
    message: "내 작업을 GitHub에 업로드한다.",
    content:
      "git push는 현재 브랜치의 Commit을 서버로 전송합니다.\n\n처음 push할 때는 -u origin main을 사용해 로컬 브랜치와 원격 브랜치를 연결합니다.\n\n이후에는 git push만으로도 같은 원격 브랜치에 변경을 올릴 수 있습니다.",
    example: "git push -u origin main\n\nCommit\n   ↓\n Push\n   ↓\nGitHub",
    note: "push는 파일 업로드가 아니라 Commit 업로드라고 강조한다.",
  },
  {
    eyebrow: "04 GitHub & PR",
    title: "Clone",
    message: "GitHub 프로젝트를 복제한다.",
    content:
      "git clone은 GitHub에 있는 프로젝트를 내 컴퓨터로 복제합니다.\n\n신입 개발자가 입사하면 가장 먼저 하는 작업 중 하나입니다.\n\nclone을 하면 파일뿐 아니라 Git 이력과 원격 저장소 연결 정보까지 함께 받아옵니다.",
    example: "git clone URL\n\nGitHub\n   ↓\n Clone\n   ↓\n Local",
    note: "다운로드와 clone의 차이를 Git 이력 포함 여부로 설명한다.",
  },
  {
    eyebrow: "04 GitHub & PR",
    title: "Pull",
    message: "최신 코드를 받아온다.",
    content:
      "git pull은 GitHub의 최신 변경을 로컬로 가져옵니다.\n\n작업 시작 전에 반드시 실행하는 습관이 중요합니다.\n\n팀원이 먼저 올린 변경을 반영하지 않고 작업하면 충돌이 생기거나 오래된 코드 기준으로 개발하게 됩니다.",
    example: "git pull\n\nGitHub\n   ↓\n Pull\n   ↓\n Local",
    note: "하루 작업 시작 루틴으로 pull을 강조한다.",
  },
  {
    eyebrow: "04 GitHub & PR",
    title: "협업 시나리오",
    message: "여러 명이 동시에 개발한다.",
    content:
      "개발자 A는 로그인 기능을 개발합니다.\n\n개발자 B는 회원가입 기능을 개발합니다.\n\n개발자 C는 버그를 수정합니다. 모두 GitHub를 통해 코드를 공유하고, 리뷰하고, 하나의 프로젝트로 합칩니다.",
    example: "A\nB\nC\n\n ↓\n\nGitHub",
    note: "GitHub가 팀의 공용 작업 공간이라는 점을 설명한다.",
  },
  {
    eyebrow: "04 GitHub & PR",
    title: "Pull Request란?",
    message: "\"내 코드를 검토해 주세요\"라는 요청이다.",
    content:
      "기능 개발이 완료되면 main에 바로 Merge하지 않습니다.\n\n먼저 Pull Request를 생성합니다.\n\nPull Request는 내 변경을 팀에게 설명하고, 리뷰를 요청하고, 안전하게 Merge하기 위한 협업 단위입니다.",
    example: "feature/login\n      ↓\n Pull Request",
    note: "PR은 허락 요청이 아니라 협업 대화의 시작이라고 설명한다.",
  },
  {
    eyebrow: "04 GitHub & PR",
    title: "Pull Request 흐름",
    message: "실무 개발의 핵심 프로세스",
    content:
      "실무에서는 개발, Commit, Push, PR, Review, Merge 흐름을 반복합니다.\n\n개발자는 기능을 만들고 Commit으로 기록한 뒤 GitHub에 Push합니다.\n\n이후 Pull Request를 만들고 리뷰를 거쳐 main에 합칩니다.",
    example: "Code\n ↓\nPR\n ↓\nReview\n ↓\nMerge",
    note: "이 흐름이 실무 개발의 기본 루프라고 강조한다.",
  },
  {
    eyebrow: "04 GitHub & PR",
    title: "왜 PR을 사용할까?",
    message: "실수를 줄이기 위해서다.",
    content:
      "혼자 보면 놓치는 부분이 많습니다.\n\n다른 사람이 코드를 검토하면 버그 발견, 품질 향상, 지식 공유 효과를 얻을 수 있습니다.\n\nPR은 코드가 main에 들어가기 전에 팀이 함께 확인하는 안전장치입니다.",
    example: "Developer\n    ↓\n Reviewer",
    note: "리뷰는 감시가 아니라 품질을 함께 올리는 과정이라고 설명한다.",
  },
  {
    eyebrow: "04 GitHub & PR",
    title: "Code Review",
    message: "리뷰는 비판이 아니라 협업이다.",
    content:
      "좋은 리뷰는 이유를 설명하고, 개선 제안을 하며, 상대를 존중합니다.\n\n나쁜 리뷰는 비난하거나 감정적인 표현을 사용합니다.\n\n리뷰는 코드를 더 좋게 만드는 협업 과정이며, 사람을 평가하는 시간이 아닙니다.",
    example: "Good Review\n- 이유 설명\n- 개선 제안\n- 존중\n\nBad Review\n- 비난\n- 감정적 표현",
    note: "리뷰 문화가 팀 생산성에 큰 영향을 준다고 설명한다.",
  },
  {
    eyebrow: "04 GitHub & PR",
    title: "좋은 PR 작성법",
    message: "작고 명확한 PR이 좋다.",
    content:
      "좋은 PR은 기능 하나만 담고, 변경이 작고, 설명이 명확합니다.\n\n나쁜 PR은 5000줄 변경처럼 너무 크거나 기능 여러 개를 한 번에 담습니다.\n\n작은 PR은 리뷰가 빠르고 정확하며, 문제가 생겨도 원인을 찾기 쉽습니다.",
    example: "Small PR\n  👍\n\nHuge PR\n  👎",
    note: "PR 크기는 리뷰 품질을 결정하는 중요한 요소라고 강조한다.",
  },
  {
    eyebrow: "04 GitHub & PR",
    title: "PR 설명 작성",
    message: "PR은 문서다.",
    content:
      "PR 설명에는 변경 내용과 테스트 결과를 적습니다.\n\n무엇을 바꿨는지, 왜 바꿨는지, 어떻게 확인했는지 알려줘야 리뷰어가 빠르게 이해할 수 있습니다.\n\n좋은 PR 설명은 나중에 프로젝트 기록으로도 남습니다.",
    example: "## 변경 내용\n\n로그인 기능 추가\n\n## 테스트\n\n로그인 성공 확인\n\nTitle\nDescription\nTest Result",
    note: "PR 설명을 귀찮은 양식이 아니라 협업 문서로 보게 만든다.",
  },
  {
    eyebrow: "04 GitHub & PR",
    title: "Approve",
    message: "리뷰 승인 후 Merge 가능",
    content:
      "리뷰어가 변경 내용을 확인한 뒤 Approve를 누르면 Merge 가능 상태가 됩니다.\n\nApprove는 이 변경을 main에 반영해도 좋다는 신호입니다.\n\n팀 규칙에 따라 1명 또는 여러 명의 승인이 필요할 수 있습니다.",
    example: "Review\n\n  ↓\n\nApprove",
    note: "승인은 책임 있는 확인 과정이라는 점을 설명한다.",
  },
  {
    eyebrow: "04 GitHub & PR",
    title: "Merge 버튼",
    message: "PR의 마지막 단계",
    content:
      "Merge를 수행하면 feature 브랜치 내용이 main에 반영됩니다.\n\nPR의 마지막 단계이지만, 실제로는 리뷰와 테스트가 완료된 뒤 눌러야 하는 버튼입니다.\n\nMerge 후에는 배포 흐름으로 이어질 수 있습니다.",
    example: "feature/login\n\n ↓\n\nmain",
    note: "Merge 버튼은 가볍게 누르는 버튼이 아니라 검증 완료의 결과라고 설명한다.",
  },
  {
    eyebrow: "04 GitHub & PR",
    title: "Squash Merge",
    message: "여러 Commit을 하나로 정리한다.",
    content:
      "Squash Merge는 여러 Commit을 하나의 Commit으로 합쳐 main에 반영하는 방식입니다.\n\n작업 중 생긴 작은 Commit A, B, C를 하나의 의미 있는 Commit으로 정리할 수 있습니다.\n\nmain 이력을 깔끔하게 유지하고 싶을 때 유용합니다.",
    example: "A+B+C\n\n ↓\n\nSingle Commit",
    note: "팀마다 Merge 방식 규칙이 다르므로 프로젝트 정책을 따르게 한다.",
  },
  {
    eyebrow: "04 GitHub & PR",
    title: "실제 GitHub 화면",
    message: "GitHub는 개발자의 업무 공간이다.",
    content:
      "GitHub에서는 PR 화면, Review 화면, Merge 화면을 실제로 확인합니다.\n\n텍스트로 개념을 이해한 뒤 실제 UI를 보면 협업 흐름이 더 선명해집니다.\n\n실무 개발자는 Git 명령어뿐 아니라 GitHub 화면을 능숙하게 다루어야 합니다.",
    example: "GitHub UI\n\nPR 화면\nReview 화면\nMerge 화면",
    note: "가능하면 실제 저장소를 열어 시연한다.",
  },
  {
    eyebrow: "04 GitHub & PR",
    title: "AI가 만든 코드 리뷰하기",
    message: "AI 코드도 반드시 리뷰해야 한다.",
    content:
      "Copilot, Cursor, Codex, Claude Code 모두 실수할 수 있습니다.\n\nAI가 만든 코드도 사람이 검토해야 합니다.\n\n특히 보안, 예외 처리, 프로젝트 맥락, 테스트 여부는 개발자가 책임지고 확인해야 합니다.",
    example: "AI Code\n   ↓\n Review",
    note: "AI 시대에는 리뷰의 중요성이 줄어드는 것이 아니라 더 커진다고 강조한다.",
  },
  {
    eyebrow: "04 GitHub & PR",
    title: "실무 팁",
    message: "좋은 개발자는 좋은 PR을 만든다.",
    content:
      "좋은 개발자는 작은 PR을 만들고, 빠르게 리뷰하며, 명확한 설명을 남기고, 리뷰 문화를 존중합니다.\n\n코드 실력뿐 아니라 협업 방식도 개발자의 중요한 역량입니다.\n\n좋은 PR은 팀 전체의 속도와 품질을 높입니다.",
    example: "Small\nFast\nClear",
    note: "좋은 PR은 동료의 시간을 아껴주는 배려라고 설명한다.",
  },
  {
    eyebrow: "04 GitHub & PR",
    title: "다음 파트 예고",
    message: "협업에는 충돌도 발생한다.",
    content:
      "다음 파트에서는 Conflict를 직접 발생시키고 해결해 봅니다.\n\n여러 사람이 같은 파일의 같은 부분을 수정하면 Git은 자동으로 판단할 수 없습니다.\n\n충돌은 문제가 아니라 협업에서 자연스럽게 발생하는 상황입니다.",
    example: "Conflict\n Coming Soon",
    note: "Conflict를 무서워할 필요 없이 해결 절차를 배우면 된다고 예고한다.",
  },
  {
    eyebrow: "05 Conflict",
    title: "Conflict란 무엇인가?",
    message: "Conflict는 Git의 문제가 아니라 협업의 결과다.",
    content:
      "많은 초보 개발자는 Conflict가 발생하면 Git이 망가졌다고 생각합니다.\n\n하지만 Conflict는 정상적인 상황입니다.\n\nGit은 단지 \"어떤 코드를 선택해야 할지 모르겠습니다.\"라고 말하는 것뿐입니다. 충돌은 협업 과정에서 서로 다른 변경이 만났다는 신호입니다.",
    example: "Developer A\n\nDeveloper B\n\n    ↓\n\n Conflict",
    note: "Conflict를 오류나 실패가 아니라 협업의 자연스러운 결과로 받아들이게 한다.",
  },
  {
    eyebrow: "05 Conflict",
    title: "왜 Conflict가 발생할까?",
    message: "같은 부분을 동시에 수정했기 때문이다.",
    content:
      "개발자 A와 개발자 B가 같은 줄을 서로 다르게 수정하면 Git은 어느 코드가 맞는지 모릅니다.\n\n예를 들어 한 사람은 AXBOOT AI로, 다른 사람은 AXBOOT ADMIN으로 제목을 바꿨습니다.\n\n이때 Git은 자동으로 판단하지 않고 개발자에게 선택을 맡깁니다.",
    example: "개발자 A\n<h1>AXBOOT AI</h1>\n\n개발자 B\n<h1>AXBOOT ADMIN</h1>\n\nSame Line\nDifferent Change",
    note: "Git은 의미를 이해하는 도구가 아니라 변경 위치와 내용을 비교하는 도구라고 설명한다.",
  },
  {
    eyebrow: "05 Conflict",
    title: "실제 협업 상황",
    message: "Conflict는 생각보다 자주 발생한다.",
    content:
      "로그인 화면, 공통 컴포넌트, 환경설정 파일, 사용자 관리처럼 여러 사람이 자주 만지는 파일에서는 Conflict가 발생하기 쉽습니다.\n\n특히 공통 코드와 설정 파일은 작은 변경도 여러 작업에 영향을 줍니다.\n\n중요한 것은 충돌 자체를 피하는 것보다 충돌을 이해하고 차분히 해결하는 능력입니다.",
    example: "A\nB\nC\n\n ↓\n\nShared File",
    note: "학생들이 실제 팀 프로젝트에서 자주 만질 파일을 떠올리게 한다.",
  },
  {
    eyebrow: "05 Conflict",
    title: "Conflict 실습 준비",
    message: "2인 1조 실습 시작",
    content:
      "이제 2인 1조로 Conflict를 직접 만들어 봅니다.\n\n학생 A는 feature/login 브랜치를 만들고, 학생 B는 feature/admin 브랜치를 만듭니다.\n\n같은 기준점에서 서로 다른 브랜치를 만들고 같은 파일을 수정하면 Conflict를 재현할 수 있습니다.",
    example: "학생 A\n git checkout -b feature/login\n\n학생 B\n git checkout -b feature/admin\n\nmain\n├─ feature/login\n└─ feature/admin",
    note: "실습 전에 각자 현재 브랜치를 반드시 확인하게 한다.",
  },
  {
    eyebrow: "05 Conflict",
    title: "학생 A 작업",
    message: "첫 번째 변경",
    content:
      "학생 A는 제목을 AXBOOT AI로 수정합니다.\n\n수정 후 Commit을 생성합니다.\n\n이 Commit은 feature/login 브랜치에 기록됩니다. 이 시점에서는 아직 충돌이 발생하지 않습니다.",
    example: "<h1>AXBOOT AI</h1>\n\ngit commit -m \"feat: update title\"\n\nfeature/login",
    note: "각 브랜치에서는 독립적으로 작업이 가능하다는 점을 다시 연결한다.",
  },
  {
    eyebrow: "05 Conflict",
    title: "학생 B 작업",
    message: "두 번째 변경",
    content:
      "학생 B는 같은 제목 줄을 AXBOOT ADMIN으로 수정합니다.\n\n수정 후 Commit을 생성합니다.\n\n학생 A와 같은 부분을 다르게 수정했기 때문에 이후 두 브랜치를 합칠 때 Git은 선택을 요구하게 됩니다.",
    example: "<h1>AXBOOT ADMIN</h1>\n\ngit commit -m \"feat: update title\"\n\nfeature/admin",
    note: "같은 파일이 아니라 같은 부분을 다르게 수정했을 때 충돌 가능성이 커진다고 설명한다.",
  },
  {
    eyebrow: "05 Conflict",
    title: "Merge 시작",
    message: "이제 충돌이 발생한다.",
    content:
      "이제 브랜치를 합쳐 봅니다.\n\nfeature/login을 merge하는 과정에서 서로 다른 변경이 같은 위치에 있으면 Git은 자동 병합을 멈춥니다.\n\n이 시점부터 개발자가 직접 파일을 열어 어떤 내용을 남길지 결정해야 합니다.",
    example: "git merge feature/login\n\nMerging...",
    note: "충돌이 나도 당황하지 말고 status와 파일 내용을 확인하게 한다.",
  },
  {
    eyebrow: "05 Conflict",
    title: "실제 Conflict 화면",
    message: "Git은 선택을 개발자에게 맡긴다.",
    content:
      "충돌이 발생하면 파일 안에 Conflict marker가 표시됩니다.\n\nHEAD 쪽은 현재 브랜치의 코드이고, 아래쪽은 병합하려는 브랜치의 코드입니다.\n\nGit은 둘 중 무엇을 남길지 모르기 때문에 사람이 파일을 수정해 최종 결과를 만들어야 합니다.",
    example: "<<<<<<< HEAD\n\nAXBOOT AI\n\n=======\n\nAXBOOT ADMIN\n\n>>>>>>> feature/admin",
    note: "Conflict marker를 지우지 않고 그대로 Commit하면 안 된다는 점을 강조한다.",
  },
  {
    eyebrow: "05 Conflict",
    title: "Conflict 구조 이해",
    message: "Conflict 표시 규칙을 이해하자.",
    content:
      "Conflict marker는 세 부분으로 나뉩니다.\n\n<<<<<<< HEAD 아래는 현재 코드, ======= 아래는 상대 코드, >>>>>>> branch는 상대 브랜치를 나타냅니다.\n\n구조를 이해하면 어떤 부분을 선택하고 어떤 부분을 삭제해야 하는지 명확해집니다.",
    example: "<<<<<<< HEAD\n현재 코드\n=======\n상대 코드\n>>>>>>> branch\n\nCurrent\nvs\nIncoming",
    note: "Current와 Incoming의 의미를 IDE 화면과 함께 연결해서 설명한다.",
  },
  {
    eyebrow: "05 Conflict",
    title: "Conflict 해결 방법",
    message: "정답은 사람이 결정한다.",
    content:
      "Conflict의 정답은 Git이 아니라 사람이 결정합니다.\n\n예를 들어 AXBOOT AI와 AXBOOT ADMIN을 모두 반영해 AXBOOT AI ADMIN으로 정리할 수 있습니다.\n\n중요한 것은 marker를 제거하고 최종적으로 원하는 코드만 남기는 것입니다.",
    example: "<h1>AXBOOT AI ADMIN</h1>\n\nManual Resolve",
    note: "선택, 조합, 새 문구 작성 등 해결 방식이 하나만 있는 것이 아니라고 설명한다.",
  },
  {
    eyebrow: "05 Conflict",
    title: "해결 후 Commit",
    message: "Conflict 해결도 Commit으로 기록한다.",
    content:
      "Conflict를 해결한 뒤에는 변경 파일을 다시 add하고 commit합니다.\n\n이 Commit은 충돌 해결 결과를 Git 역사에 기록합니다.\n\n충돌 해결도 중요한 작업이므로 어떤 의도로 해결했는지 팀원과 공유할 필요가 있습니다.",
    example: "git add .\ngit commit\n\nResolved",
    note: "해결 후 status를 확인해 충돌 상태가 끝났는지 점검하게 한다.",
  },
  {
    eyebrow: "05 Conflict",
    title: "VSCode Conflict 도구",
    message: "IDE가 충돌 해결을 도와준다.",
    content:
      "VSCode는 Conflict 해결을 위한 버튼을 제공합니다.\n\nAccept Current, Accept Incoming, Accept Both 기능을 사용하면 marker를 직접 지우지 않고도 선택할 수 있습니다.\n\n다만 버튼을 누르기 전에 어떤 코드가 현재 코드이고 어떤 코드가 상대 코드인지 이해해야 합니다.",
    example: "Current\nIncoming\nBoth",
    note: "도구는 편하지만 의미를 모르면 잘못된 선택을 할 수 있다고 설명한다.",
  },
  {
    eyebrow: "05 Conflict",
    title: "Conflict를 줄이는 방법",
    message: "충돌은 예방할 수 있다.",
    content:
      "Conflict를 완전히 없앨 수는 없지만 줄일 수는 있습니다.\n\nPull을 자주 하고, Branch를 오래 유지하지 않고, PR을 빨리 Merge하는 것이 도움이 됩니다.\n\n작업 범위를 작게 나누고 팀원과 자주 공유하는 습관도 중요합니다.",
    example: "Pull Often\n\nMerge Fast",
    note: "충돌 예방은 명령어보다 팀의 작업 습관에 가깝다고 설명한다.",
  },
  {
    eyebrow: "05 Conflict",
    title: "실무 사례",
    message: "Conflict는 매일 발생한다.",
    content:
      "대규모 프로젝트에서는 Conflict가 없는 날이 드뭅니다.\n\n중요한 것은 발생 자체가 아니라 해결 능력입니다.\n\nConflict를 무서워하지 않고 원인을 읽고, 팀원과 대화하고, 정확히 해결하는 개발자가 실무에서 신뢰를 얻습니다.",
    example: "Conflict\n\nis Normal",
    note: "충돌을 낸 사람이 잘못한 것이 아니라 협업 중 자연스러운 현상이라고 안심시킨다.",
  },
  {
    eyebrow: "05 Conflict",
    title: "정리",
    message: "Conflict는 협업의 증거다.",
    content:
      "오늘은 Conflict 원인, Conflict 구조, Conflict 해결, 예방 방법을 배웠습니다.\n\nConflict는 Git이 망가진 상황이 아니라 여러 사람이 같은 프로젝트를 적극적으로 수정하고 있다는 증거입니다.\n\n구조를 이해하고 차분히 해결하면 Conflict도 협업의 일부가 됩니다.",
    example: "Conflict\n\n→ Resolve\n\n→ Commit",
    note: "마지막에는 Conflict를 직접 해결해본 경험이 Git 자신감을 크게 높인다고 마무리한다.",
  },
  {
    eyebrow: "06 Real World",
    title: "실무에서는 Git을 어떻게 사용할까?",
    message: "교과서와 실무는 다르다.",
    content:
      "Git을 배우면 보통 Git Flow를 먼저 접합니다.\n\n하지만 실제 회사에서는 프로젝트 규모와 팀 문화에 따라 다양한 전략을 사용합니다.\n\n중요한 것은 특정 방법론이 아니라 팀 전체가 같은 규칙으로 일하는 것입니다. Git 전략은 팀이 꾸준히 지킬 수 있어야 의미가 있습니다.",
    example: "Git Theory\n\n      ↓\n\nReal World",
    note: "\"정답은 없다. 팀에 맞는 전략이 있을 뿐이다.\"라고 강조한다.",
  },
  {
    eyebrow: "06 Real World",
    title: "실무에서 가장 중요한 것",
    message: "코드보다 협업이 중요하다.",
    content:
      "실무에서는 좋은 개발자보다 좋은 협업자가 더 높은 평가를 받는 경우가 많습니다.\n\n혼자 완벽한 코드를 만드는 것보다 팀 전체 생산성을 높이는 것이 중요합니다.\n\nGit은 협업을 위한 언어입니다. Commit, Branch, PR은 팀원과 소통하는 방식이기도 합니다.",
    example: "Code\n\n   +\n\nCommunication",
    note: "기술 역량과 커뮤니케이션 역량이 함께 평가된다고 설명한다.",
  },
  {
    eyebrow: "06 Real World",
    title: "AXBOOT 브랜치 전략",
    message: "단순한 전략이 강하다.",
    content:
      "AXBOOT 프로젝트에서는 main, dev, feat/* 구조를 사용합니다.\n\n브랜치가 많아질수록 관리 비용이 증가하기 때문입니다.\n\n단순한 전략은 팀원들이 이해하고 반복하기 쉽습니다. 실무에서는 복잡한 규칙보다 지속 가능한 규칙이 더 강합니다.",
    example: "main\ndev\nfeat/*",
    note: "브랜치 전략은 팀 규모와 배포 방식에 맞게 선택한다고 설명한다.",
  },
  {
    eyebrow: "06 Real World",
    title: "main 브랜치",
    message: "main은 항상 배포 가능한 상태를 유지한다.",
    content:
      "main 브랜치는 운영 서버 기준입니다.\n\n직접 개발하지 않습니다.\n\nPR을 통해서만 변경됩니다. main이 깨지면 운영 서비스에 영향을 줄 수 있으므로 가장 안정적으로 관리해야 합니다.",
    example: "Production\n\nmain",
    note: "main은 실험 공간이 아니라 운영 기준선이라고 강조한다.",
  },
  {
    eyebrow: "06 Real World",
    title: "dev 브랜치",
    message: "통합 개발 공간",
    content:
      "모든 기능 브랜치가 dev로 먼저 Merge 됩니다.\n\nQA와 검증도 dev에서 진행합니다.\n\ndev는 다음 배포 후보가 모이는 공간입니다. 기능이 main에 가기 전에 통합 테스트를 수행하는 완충 지대 역할을 합니다.",
    example: "feat/*\n\n  ↓\n\n dev",
    note: "dev는 여러 기능을 모아 검증하는 공간이라고 설명한다.",
  },
  {
    eyebrow: "06 Real World",
    title: "feat 브랜치",
    message: "하나의 기능은 하나의 브랜치",
    content:
      "feature/login, feature/user-list, feature/order처럼 기능 단위 개발을 수행합니다.\n\n하나의 기능은 하나의 브랜치에서 개발하는 것이 원칙입니다.\n\n이렇게 하면 작업 범위가 명확하고, 리뷰와 테스트도 쉬워집니다.",
    example: "feature/login\n\nfeature/user\n\nfeature/order",
    note: "브랜치 이름만 봐도 작업 목적이 보여야 한다고 설명한다.",
  },
  {
    eyebrow: "06 Real World",
    title: "왜 Git Flow를 안 쓰는가",
    message: "복잡함은 비용이다.",
    content:
      "Git Flow는 develop, release, hotfix, feature 등 브랜치가 많아집니다.\n\n대규모 릴리스 중심 프로젝트에는 유용할 수 있지만 소규모 팀에서는 과도할 수 있습니다.\n\n전략이 복잡하면 규칙을 지키는 비용이 커지고, 결국 흐름이 무너질 수 있습니다.",
    example: "Too Many Branches\n\ndevelop\nrelease\nhotfix\nfeature",
    note: "Git Flow가 나쁘다는 뜻이 아니라 상황에 맞아야 한다고 설명한다.",
  },
  {
    eyebrow: "06 Real World",
    title: "GitHub Flow",
    message: "빠른 개발에 적합하다.",
    content:
      "GitHub Flow는 main, feature, PR, Merge 중심의 매우 단순한 전략입니다.\n\n스타트업에서 많이 사용합니다.\n\n작게 만들고 빠르게 리뷰하고 자주 배포하는 팀에 잘 맞습니다. 단순하지만 리뷰와 테스트 규칙이 함께 있어야 안전합니다.",
    example: "main\n\n ↓\n\nfeature\n\n ↓\n\nPR",
    note: "단순한 전략일수록 PR 품질과 테스트 자동화가 중요하다고 덧붙인다.",
  },
  {
    eyebrow: "06 Real World",
    title: "좋은 Commit 습관",
    message: "작은 Commit이 좋은 Commit이다.",
    content:
      "좋은 Commit은 기능 하나, 의미 명확, 작은 변경을 담습니다.\n\n나쁜 Commit은 너무 크거나 여러 기능을 한 번에 포함합니다.\n\n작은 Commit은 리뷰하기 쉽고, 문제가 생겼을 때 되돌리기 쉽습니다. Commit은 개발자의 작업 사고를 보여주는 기록입니다.",
    example: "Small Commit\n\n 👍",
    note: "Commit은 작게, 메시지는 의도가 보이게 작성하게 한다.",
  },
  {
    eyebrow: "06 Real World",
    title: "좋은 PR 습관",
    message: "리뷰 가능한 크기로 만든다.",
    content:
      "좋은 PR은 리뷰 가능한 크기여야 합니다.\n\n예를 들어 100~300줄 정도의 변경은 리뷰어가 맥락을 이해하기 쉽습니다.\n\n반대로 5000줄 이상 변경은 리뷰 품질이 떨어지고 버그를 놓칠 가능성이 커집니다.",
    example: "Reviewable PR\n\nGood: 100~300 lines\nBad: 5000+ lines",
    note: "PR 크기는 동료의 시간을 고려하는 협업 매너라고 설명한다.",
  },
  {
    eyebrow: "06 Real World",
    title: "배포 전략",
    message: "배포는 Merge의 결과다.",
    content:
      "실무에서는 feature가 dev에 Merge되고, dev에서 검증된 변경이 main으로 이동하며, main 기준으로 deploy가 이루어집니다.\n\n배포는 단순히 서버에 올리는 행위가 아닙니다.\n\n검증된 코드가 안정 브랜치에 반영된 결과입니다.",
    example: "feat\n ↓\ndev\n ↓\nmain\n ↓\ndeploy",
    note: "브랜치 흐름과 배포 흐름이 연결되어 있다는 점을 보여준다.",
  },
  {
    eyebrow: "06 Real World",
    title: "Hotfix",
    message: "운영 장애는 빠르게 대응한다.",
    content:
      "긴급 버그 수정 시 main 기준으로 수정합니다.\n\n수정 후 dev에도 반영합니다.\n\nHotfix는 운영 장애를 빠르게 해결하기 위한 예외적인 흐름입니다. 빠른 대응과 동시에 이후 개발 브랜치와의 동기화도 잊지 않아야 합니다.",
    example: "main\n\n ↓\n\nHotfix",
    note: "운영 장애 대응은 속도와 기록을 모두 챙겨야 한다고 설명한다.",
  },
  {
    eyebrow: "06 Real World",
    title: "코드 리뷰 문화",
    message: "좋은 리뷰가 좋은 팀을 만든다.",
    content:
      "리뷰는 평가가 아닙니다.\n\n함께 품질을 높이는 과정입니다.\n\n좋은 리뷰 문화는 버그를 줄이고, 지식을 공유하고, 팀의 코드 기준을 맞추게 해줍니다. 말투와 설명 방식도 협업 품질의 일부입니다.",
    example: "Review\n\n≠\n\nCriticism",
    note: "리뷰는 사람을 비판하는 것이 아니라 코드를 개선하는 과정이라고 강조한다.",
  },
  {
    eyebrow: "06 Real World",
    title: "AI 시대 Git 운영",
    message: "AI가 코드를 만들고 사람이 검증한다.",
    content:
      "Cursor, Codex, Copilot, Claude Code 모두 생산성을 높입니다.\n\n그러나 Git 없이 운영할 수는 없습니다.\n\nAI가 만든 코드는 더 빠르게 늘어나기 때문에 변경 이력, 리뷰, 테스트, 롤백이 더 중요해집니다. AI 시대에도 Git은 개발자의 안전망입니다.",
    example: "AI\n\n ↓\n\nCode\n\n ↓\n\nGit",
    note: "AI 도구를 쓸수록 Git 운영 원칙이 더 중요해진다고 연결한다.",
  },
  {
    eyebrow: "06 Real World",
    title: "실무 Git 정리",
    message: "단순하고 일관된 규칙이 가장 강하다.",
    content:
      "오늘은 브랜치 전략, Commit 습관, PR 문화, 배포 전략, Hotfix를 배웠습니다.\n\n실무 Git 운영에서 가장 강한 것은 단순하고 일관된 규칙입니다.\n\n팀이 이해하고 반복할 수 있는 전략을 만들고, 모두가 같은 방식으로 지키는 것이 중요합니다.",
    example: "Simple\n\nConsistent\n\nRepeatable",
    note: "강의 마지막에는 Git은 팀의 일하는 방식을 담는 도구라고 정리한다.",
  },
  {
    eyebrow: "07 AI Era",
    title: "AI가 개발을 바꾸고 있다",
    message: "코드를 작성하는 방식이 바뀌고 있다.",
    content:
      "과거에는 개발자가 모든 코드를 직접 작성했습니다.\n\n지금은 GitHub Copilot, Cursor, Codex, Claude Code 같은 AI 도구가 코드를 생성합니다.\n\n개발자는 코드를 작성하는 사람에서 코드를 검토하고 방향을 제시하는 사람으로 변화하고 있습니다.",
    example: "Developer\n\n ↓\n\nAI Assistant\n\n ↓\n\nCode",
    note: "\"AI는 개발자를 대체하는 것이 아니라 개발 방식을 바꾸고 있다.\"라고 설명한다.",
  },
  {
    eyebrow: "07 AI Era",
    title: "Copilot의 등장",
    message: "AI 코드 자동완성 시대",
    content:
      "Copilot은 개발자가 작성하려는 코드를 예측합니다.\n\n예전에는 10줄을 직접 입력했다면 지금은 Tab 한 번으로 생성할 수 있습니다.\n\n코드 작성 속도는 빨라졌지만, 생성된 코드가 맞는지 판단하는 능력은 여전히 개발자에게 필요합니다.",
    example: "function login() {\n\nAI Suggestion\n\n}",
    note: "자동완성이 편리하지만 검증 없이 받아들이면 위험할 수 있다고 설명한다.",
  },
  {
    eyebrow: "07 AI Era",
    title: "Cursor와 AI IDE",
    message: "IDE 자체가 AI 중심으로 변하고 있다.",
    content:
      "Cursor는 단순 자동완성이 아닙니다.\n\n프로젝트 전체를 이해하고 파일 생성, 리팩토링, 테스트 코드 작성까지 수행합니다.\n\n개발 환경 자체가 AI와 대화하며 작업하는 방식으로 변하고 있습니다.",
    example: "Prompt\n\n ↓\n\nFull Feature",
    note: "IDE가 편집기에서 협업 파트너처럼 바뀌고 있다는 점을 보여준다.",
  },
  {
    eyebrow: "07 AI Era",
    title: "Codex와 Agent 개발",
    message: "AI는 이제 작업 단위를 수행한다.",
    content:
      "최신 AI는 코드를 생성하는 수준을 넘어 실제 작업을 수행합니다.\n\n예를 들어 기능 추가, 버그 수정, 테스트 실행, PR 생성까지 이어서 처리할 수 있습니다.\n\n이제 개발자는 작업을 명확히 지시하고 결과를 검토하는 역량이 중요해지고 있습니다.",
    example: "Task\n\n ↓\n\nAgent\n\n ↓\n\nResult",
    note: "AI Agent는 실행력이 있으므로 변경 검토와 Git 기록이 더 중요하다고 연결한다.",
  },
  {
    eyebrow: "07 AI Era",
    title: "AI는 왜 실수할까?",
    message: "AI도 버그를 만든다.",
    content:
      "AI는 확률적으로 코드를 생성합니다.\n\n따라서 잘못된 로직, 보안 문제, 성능 문제를 만들 수 있습니다.\n\n겉보기에는 그럴듯한 코드라도 프로젝트 맥락과 요구사항에 맞지 않을 수 있습니다. 그래서 검토와 테스트가 반드시 필요합니다.",
    example: "AI\n\n ≠\n\n Always Correct",
    note: "AI 결과물을 신뢰하되 검증은 개발자의 책임이라고 강조한다.",
  },
  {
    eyebrow: "07 AI Era",
    title: "그래서 Git이 더 중요해졌다",
    message: "AI가 많아질수록 변경 관리가 중요해진다.",
    content:
      "과거에는 사람이 하루에 10번 수정했다면 AI를 사용하면 하루에 수백 번 수정할 수 있습니다.\n\n변경량이 많아질수록 Git의 중요성은 커집니다.\n\n어떤 변경이 언제 왜 들어왔는지 기록하지 않으면 AI가 만든 변화 속도를 사람이 따라가기 어렵습니다.",
    example: "More AI\n\n ↓\n\nMore Changes\n\n ↓\n\nMore Git",
    note: "AI가 Git을 대체하는 것이 아니라 Git 사용량을 늘린다고 설명한다.",
  },
  {
    eyebrow: "07 AI Era",
    title: "AI와 Commit",
    message: "AI 코드도 Commit으로 관리한다.",
    content:
      "AI가 생성한 코드라도 Commit 단위로 기록해야 합니다.\n\n좋은 습관은 AI가 만든 변경도 의미 있는 단위로 나누어 Commit하는 것입니다.\n\nCommit 메시지에는 변경 목적이 드러나야 하며, 필요한 경우 AI를 활용한 작업임을 남길 수도 있습니다.",
    example: "git commit -m \"feat: add login page by AI\"\n\nAI Code\n\n ↓\n\nCommit",
    note: "AI가 만든 코드도 사람 코드와 동일한 기준으로 기록해야 한다고 강조한다.",
  },
  {
    eyebrow: "07 AI Era",
    title: "AI와 Branch",
    message: "AI 실험은 Branch에서 한다.",
    content:
      "AI에게 \"로그인 기능 만들어줘\"라고 요청했다면 main이 아닌 feature 브랜치에서 수행해야 합니다.\n\nAI 작업은 큰 변경을 만들 수 있으므로 안전한 실험 공간이 필요합니다.\n\nBranch를 사용하면 실패해도 main을 보호할 수 있습니다.",
    example: "main\n\n   feature/ai-login",
    note: "AI 실험은 반드시 격리된 브랜치에서 하게 한다.",
  },
  {
    eyebrow: "07 AI Era",
    title: "AI와 Code Review",
    message: "AI 코드도 반드시 리뷰해야 한다.",
    content:
      "AI는 빠르지만 책임지지 않습니다.\n\n책임은 개발자에게 있습니다.\n\nAI가 만든 코드도 사람이 읽고, 테스트하고, 프로젝트 기준에 맞는지 확인해야 합니다. 리뷰는 AI 시대에 더 중요한 안전장치입니다.",
    example: "AI\n\n ↓\n\nReview\n\n ↓\n\nMerge",
    note: "빠르게 생성된 코드일수록 더 꼼꼼한 리뷰가 필요하다고 설명한다.",
  },
  {
    eyebrow: "07 AI Era",
    title: "AI와 Pull Request",
    message: "AI가 만든 코드도 PR을 거친다.",
    content:
      "실무에서는 AI 생성 코드도 PR, Review, Merge 과정을 동일하게 적용합니다.\n\nAI가 작성했더라도 main에 바로 넣지 않습니다.\n\nPR은 변경을 설명하고 검증하며 팀의 기준에 맞추는 절차입니다.",
    example: "AI\n\n ↓\n\nPR\n\n ↓\n\nReview",
    note: "AI 코드도 협업 프로세스 바깥으로 예외 처리하지 않는 것이 중요하다고 설명한다.",
  },
  {
    eyebrow: "07 AI Era",
    title: "AXBOOT AI 사례",
    message: "AI는 개발 생산성을 높인다.",
    content:
      "AXBOOT AI에서는 요구사항에서 화면 생성, API 연결, 검토, Commit, 배포로 이어지는 흐름을 경험할 수 있습니다.\n\nAI는 반복 작업을 줄이고 초기 구현 속도를 높여줍니다.\n\n하지만 최종 품질과 책임은 여전히 개발자의 검토와 Git 기록에 달려 있습니다.",
    example: "Talk\n\n ↓\n\nGenerate\n\n ↓\n\nCommit",
    note: "생산성 향상과 검증 책임을 함께 이야기한다.",
  },
  {
    eyebrow: "07 AI Era",
    title: "미래의 개발자",
    message: "개발자는 코더에서 설계자로 이동한다.",
    content:
      "AI가 코드를 작성하는 비중은 계속 증가합니다.\n\n개발자는 문제 정의, 설계, 검증 역할이 더 중요해집니다.\n\n단순히 코드를 많이 치는 능력보다 무엇을 만들지 정의하고, 결과가 맞는지 판단하는 능력이 중요해집니다.",
    example: "Coder\n\n ↓\n\nDesigner\n\n ↓\n\nArchitect",
    note: "학생들에게 개발자의 역할이 사라지는 것이 아니라 상위 단계로 이동한다고 설명한다.",
  },
  {
    eyebrow: "07 AI Era",
    title: "AI 시대에 필요한 능력",
    message: "코드 작성보다 코드 이해가 중요하다.",
    content:
      "AI 시대에 필요한 능력은 문제 해결, 설계 능력, Git, 리뷰 능력입니다.\n\n코드를 직접 작성하는 시간은 줄어들 수 있지만 코드를 이해하고 개선하는 능력은 더 중요해집니다.\n\nGit은 이 과정에서 변경을 추적하고 협업을 유지하는 핵심 도구입니다.",
    example: "Think\n\n ↓\n\nReview\n\n ↓\n\nImprove",
    note: "AI를 잘 쓰려면 기본기가 더 중요하다는 메시지로 연결한다.",
  },
  {
    eyebrow: "07 AI Era",
    title: "Git은 사라질까?",
    message: "오히려 더 중요해질 것이다.",
    content:
      "AI는 코드를 생성합니다.\n\n하지만 변경 이력, 협업, 검증, 배포는 여전히 필요합니다.\n\nAI가 만든 코드가 많아질수록 누가, 언제, 왜 변경했는지 관리하는 Git의 역할은 더 중요해질 것입니다.",
    example: "AI\n\n +\n\n Git\n\n =\n\n Future",
    note: "Git은 AI 시대에도 개발자의 작업 기록을 책임지는 도구라고 정리한다.",
  },
  {
    eyebrow: "07 AI Era",
    title: "최종 정리",
    message: "AI가 코드를 만들고 Git이 역사를 관리한다.",
    content:
      "오늘은 Git 기본기, Branch, Merge, GitHub, Conflict, 실무 전략, AI 시대 Git을 배웠습니다.\n\nGit은 개발자의 가장 중요한 습관 중 하나입니다.\n\nAI가 코드를 더 많이 만들수록 Git은 변경을 이해하고 성장의 기록을 남기는 도구가 됩니다.",
    example: "Code\n\n ↓\n\nGit\n\n ↓\n\nHistory\n\n ↓\n\nGrowth",
    note: "전체 강의의 마지막 메시지로 Git은 개발자의 성장 기록이라고 마무리한다.",
  },
];

function clampSlide(index: number) {
  return Math.min(Math.max(index, 0), slides.length - 1);
}

function DeveloperPanel({ slide }: { slide: Slide }) {
  return (
    <div className="h-full min-h-0">
      <div className="h-full min-h-0 overflow-hidden rounded-md border border-slate-800 bg-slate-950 text-slate-100">
        <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-rose-500" />
            <span className="h-3 w-3 rounded-full bg-amber-400" />
            <span className="h-3 w-3 rounded-full bg-lime-400" />
          </div>
          <span className="font-mono text-[11px] font-bold uppercase text-slate-400">terminal</span>
        </div>
        <pre className="h-full whitespace-pre-wrap break-words p-4 font-mono text-sm font-semibold leading-7 text-lime-100 md:text-base">
          <code>{slide.example}</code>
        </pre>
      </div>
    </div>
  );
}

function App() {
  const [current, setCurrent] = useState(0);
  const [hoveredSlide, setHoveredSlide] = useState<number | null>(null);
  const [progressHoverX, setProgressHoverX] = useState(0);
  const activeSlide = slides[current];
  const progress = useMemo(() => ((current + 1) / slides.length) * 100, [current]);
  const pageTone = slides.length <= 1 ? 0 : current / (slides.length - 1);
  const progressRed = Math.round(220 * pageTone);
  const progressDark = Math.round(20 * pageTone);
  const progressStyle = {
    backgroundColor: `rgb(${progressRed}, ${progressDark}, ${progressDark})`,
  };

  const updateProgressHover = (clientX: number, rect: DOMRect) => {
    const ratio = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 0.999999);
    setHoveredSlide(clampSlide(Math.floor(ratio * slides.length)));
    setProgressHoverX(Math.min(Math.max(ratio * 100, 12), 88));
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === " ") {
        setCurrent((value) => clampSlide(value + 1));
      }

      if (event.key === "ArrowLeft") {
        setCurrent((value) => clampSlide(value - 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <main className="h-screen overflow-hidden bg-white text-slate-950">
      <section className="relative h-screen w-full overflow-hidden bg-white">
        <div
          className="absolute inset-x-0 top-0 z-20 h-5 cursor-pointer"
          onClick={(event) => {
            const rect = event.currentTarget.getBoundingClientRect();
            const ratio = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 0.999999);
            setCurrent(clampSlide(Math.floor(ratio * slides.length)));
          }}
          onMouseLeave={() => setHoveredSlide(null)}
          onMouseMove={(event) => updateProgressHover(event.clientX, event.currentTarget.getBoundingClientRect())}
        >
          <div className="h-1 bg-slate-200">
            <div className="h-full transition-all duration-300" style={{ width: `${progress}%`, ...progressStyle }} />
          </div>
          {hoveredSlide !== null && (
            <div
              className="pointer-events-none absolute top-3 z-30 w-64 -translate-x-1/2 rounded-md border border-slate-200 bg-white px-3 py-2 text-left shadow-sm"
              style={{ left: `${progressHoverX}%` }}
            >
              <div className="mb-1 font-mono text-[11px] font-black text-lime-600">
                {hoveredSlide + 1} / {slides.length}
              </div>
              <div className="truncate text-xs font-black text-slate-950">{slides[hoveredSlide].title}</div>
              <div className="mt-1 truncate text-[11px] font-bold text-slate-500">{slides[hoveredSlide].eyebrow}</div>
            </div>
          )}
        </div>

        <div className="grid h-full p-5 pb-6 md:p-7 md:pb-8 lg:p-8">
          <div className="grid min-h-0 grid-cols-2 gap-5">
            <div className="flex min-w-0 flex-col gap-3">
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <div className="inline-flex items-center gap-2 rounded-md bg-slate-100 px-3 py-2 text-xs font-bold uppercase tracking-normal text-slate-600">
                    <Play size={14} />
                    {activeSlide.eyebrow}
                  </div>
                  <div className="rounded-md border border-slate-200 bg-white px-2 py-1 font-mono text-[10px] font-black text-slate-500">
                    {current + 1} / {slides.length}
                  </div>
                </div>
                <h2 className="max-w-3xl text-3xl font-black leading-tight text-slate-950">{activeSlide.title}</h2>
                <p className="mt-3 max-w-2xl text-sm font-bold leading-6 text-lime-700 md:text-base">{activeSlide.message}</p>
              </div>

              <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
                <div className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-normal text-slate-500">
                  <BookOpen size={15} />
                  강의 내용
                </div>
                <p className="text-sm font-medium leading-7 text-slate-700 md:text-base">{activeSlide.content}</p>
              </div>

              <div className="rounded-md border border-slate-200 bg-white p-4">
                <div className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-normal text-slate-500">
                  <Clock3 size={15} />
                  발표자 노트
                </div>
                <p className="text-[13px] font-semibold leading-6 text-slate-700 md:text-sm">{activeSlide.note}</p>
              </div>
            </div>

            <DeveloperPanel slide={activeSlide} />
          </div>
        </div>

        <div className="slide-nav-zone absolute left-0 top-0 z-10 flex h-full w-24 items-center justify-start pl-3 md:w-28 md:pl-4">
          <button
            className="slide-nav-button grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white/90 text-slate-700 shadow-sm backdrop-blur transition duration-200 hover:bg-white disabled:cursor-not-allowed"
            aria-label="이전 슬라이드"
            disabled={current === 0}
            onClick={() => setCurrent((value) => clampSlide(value - 1))}
          >
            <ArrowLeft size={20} />
          </button>
        </div>
        <div className="slide-nav-zone absolute right-0 top-0 z-10 flex h-full w-24 items-center justify-end pr-3 md:w-28 md:pr-4">
          <button
            className="slide-nav-button grid h-11 w-11 place-items-center rounded-full border border-slate-950 bg-slate-950 text-white shadow-sm transition duration-200 hover:bg-slate-800 disabled:cursor-not-allowed"
            aria-label="다음 슬라이드"
            disabled={current === slides.length - 1}
            onClick={() => setCurrent((value) => clampSlide(value + 1))}
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </section>
    </main>
  );
}

export default App;
