/*
  Warnings:

  - A unique constraint covering the columns `[discordId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "CommunityReport" DROP CONSTRAINT "CommunityReport_reporterId_fkey";

-- DropForeignKey
ALTER TABLE "CommunityReport" DROP CONSTRAINT "CommunityReport_resolverId_fkey";

-- DropForeignKey
ALTER TABLE "DirectMessage" DROP CONSTRAINT "DirectMessage_receiverId_fkey";

-- DropForeignKey
ALTER TABLE "DirectMessage" DROP CONSTRAINT "DirectMessage_senderId_fkey";

-- DropForeignKey
ALTER TABLE "HubPoll" DROP CONSTRAINT "HubPoll_authorId_fkey";

-- DropForeignKey
ALTER TABLE "HubPollOption" DROP CONSTRAINT "HubPollOption_pollId_fkey";

-- DropForeignKey
ALTER TABLE "HubPollVote" DROP CONSTRAINT "HubPollVote_optionId_fkey";

-- DropForeignKey
ALTER TABLE "HubPollVote" DROP CONSTRAINT "HubPollVote_pollId_fkey";

-- DropForeignKey
ALTER TABLE "HubPollVote" DROP CONSTRAINT "HubPollVote_userId_fkey";

-- DropForeignKey
ALTER TABLE "ProfileRecommendation" DROP CONSTRAINT "ProfileRecommendation_authorId_fkey";

-- DropForeignKey
ALTER TABLE "ProfileRecommendation" DROP CONSTRAINT "ProfileRecommendation_targetId_fkey";

-- DropForeignKey
ALTER TABLE "TeamFinderProfile" DROP CONSTRAINT "TeamFinderProfile_userId_fkey";

-- DropForeignKey
ALTER TABLE "TeamInvitation" DROP CONSTRAINT "TeamInvitation_recipientId_fkey";

-- DropForeignKey
ALTER TABLE "TeamInvitation" DROP CONSTRAINT "TeamInvitation_senderId_fkey";

-- DropForeignKey
ALTER TABLE "TeamInvitation" DROP CONSTRAINT "TeamInvitation_teamId_fkey";

-- DropForeignKey
ALTER TABLE "TeamScoreEntry" DROP CONSTRAINT "TeamScoreEntry_authorId_fkey";

-- DropForeignKey
ALTER TABLE "TeamScoreEntry" DROP CONSTRAINT "TeamScoreEntry_teamId_fkey";

-- DropForeignKey
ALTER TABLE "UserNotification" DROP CONSTRAINT "UserNotification_userId_fkey";

-- DropForeignKey
ALTER TABLE "WeeklyChallenge" DROP CONSTRAINT "WeeklyChallenge_authorId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "authProvider" TEXT NOT NULL DEFAULT 'local',
ADD COLUMN     "discordAvatar" TEXT,
ADD COLUMN     "discordId" TEXT,
ADD COLUMN     "discordUsername" TEXT;

-- CreateTable
CREATE TABLE "OAuthLoginCode" (
    "id" SERIAL NOT NULL,
    "codeHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "OAuthLoginCode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OAuthLoginCode_codeHash_key" ON "OAuthLoginCode"("codeHash");

-- CreateIndex
CREATE INDEX "OAuthLoginCode_userId_idx" ON "OAuthLoginCode"("userId");

-- CreateIndex
CREATE INDEX "OAuthLoginCode_expiresAt_idx" ON "OAuthLoginCode"("expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "User_discordId_key" ON "User"("discordId");

-- AddForeignKey
ALTER TABLE "ProfileRecommendation" ADD CONSTRAINT "ProfileRecommendation_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileRecommendation" ADD CONSTRAINT "ProfileRecommendation_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DirectMessage" ADD CONSTRAINT "DirectMessage_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DirectMessage" ADD CONSTRAINT "DirectMessage_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamInvitation" ADD CONSTRAINT "TeamInvitation_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamInvitation" ADD CONSTRAINT "TeamInvitation_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamInvitation" ADD CONSTRAINT "TeamInvitation_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamFinderProfile" ADD CONSTRAINT "TeamFinderProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HubPoll" ADD CONSTRAINT "HubPoll_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HubPollOption" ADD CONSTRAINT "HubPollOption_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "HubPoll"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HubPollVote" ADD CONSTRAINT "HubPollVote_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "HubPoll"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HubPollVote" ADD CONSTRAINT "HubPollVote_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "HubPollOption"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HubPollVote" ADD CONSTRAINT "HubPollVote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeeklyChallenge" ADD CONSTRAINT "WeeklyChallenge_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunityReport" ADD CONSTRAINT "CommunityReport_reporterId_fkey" FOREIGN KEY ("reporterId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunityReport" ADD CONSTRAINT "CommunityReport_resolverId_fkey" FOREIGN KEY ("resolverId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserNotification" ADD CONSTRAINT "UserNotification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamScoreEntry" ADD CONSTRAINT "TeamScoreEntry_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamScoreEntry" ADD CONSTRAINT "TeamScoreEntry_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OAuthLoginCode" ADD CONSTRAINT "OAuthLoginCode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
