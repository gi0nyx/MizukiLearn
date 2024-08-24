<script>
    export let badges = [];
</script>

<div class="profile-badges">
    {#each badges as badge}
        <div class="profile-badges-item">
            <img 
                src={badge.imageUrl} 
                alt={badge.name} 
                style="filter: {badge.achieved ? 'none' : 'grayscale(100%)'};" 
            />
            <span>{badge.name}</span>
        </div>
    {/each}
</div>

<style>
    .profile-badges {
        background-color: #f5f7fa;
        border-radius: 12px;
        padding: 2rem;
        box-shadow: var(--shadow);
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 2.5rem;
    }

    .profile-badges-item {
        display: flex;
        align-items: center;
        margin: 0 1.5rem;
    }

    .profile-badges-item img {
        width: 128px;
        height: 128px;
        margin-right: 0.5rem;
        transition: filter 0.3s ease;
    }

    .profile-badges-item span {
        font-weight: 500;
    }
</style>
