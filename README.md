# LINKA Frontend
---
## Project Structure
```
linka-frontend/
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── tsconfig.json
├── README.md
├── public/
└── src/
    ├── app/
    │   ├── globals.css
    │   ├── layout.tsx
    │   ├── page.tsx
    │   ├── api/
    │   │   ├── cases/
    │   │   │   ├── route.ts
    │   │   │   └── [id]/
    │   │   │       ├── route.ts
    │   │   │       └── matches/
    │   │   │           └── route.ts
    │   │   ├── chat/
    │   │   │   └── route.ts
    │   │   └── legal-consulation/
    │   │       └── route.ts
    │   ├── cases/
    │   │   ├── page.tsx
    │   │   └── [id]/
    │   │       ├── page.tsx
    │   │       └── chat/
    │   │           └── page.tsx
    │   ├── legal-consultation/
    │   │   └── page.tsx
    │   └── register/
    │       └── page.tsx
    ├── components/
    │   ├── cases/
    │   │   ├── CaseCard.tsx
    │   │   ├── MatchDetail.tsx
    │   │   └── MatchList.tsx
    │   ├── chat/
    │   │   ├── AICommands.tsx
    │   │   ├── ChatWindow.tsx
    │   │   ├── MessageInput.tsx
    │   │   └── MessageList.tsx
    │   ├── legal-consulation/
    │   │   ├── LegalChatbot.tsx
    │   │   └── SourceReference.tsx
    │   ├── register/
    │   │   ├── AIQuestions.tsx
    │   │   ├── BasicInfoForm.tsx
    │   │   ├── EvidenceUpload.tsx
    │   │   └── StatementEditor.tsx
    │   └── ui/
    │       ├── Badge.tsx
    │       ├── Button.tsx
    │       ├── Card.tsx
    │       ├── Input.tsx
    │       └── Modal.tsx
    ├── lib/
    │   ├── api.ts
    │   ├── utils.ts
    │   └── websocket.ts
    ├── store/
    │   └── useStore.ts
    └── types/
        ├── case.ts
        ├── chat.ts
        └── legal-consulation.ts
```
